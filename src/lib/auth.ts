"use server";

import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "src/lib/subscribers.json");

// Helper to get write-enabled Sanity client if token is available
function getWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) return null;
  
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    token: token,
    useCdn: false,
  });
}

// Helper to ensure file exists and read subscribers (local fallback)
function getSubscribers(): string[] {
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    // Create the directory if it doesn't exist
    const dir = path.dirname(SUBSCRIBERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(["test@example.com"]));
  }
  try {
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Helper to save subscribers (local fallback)
function saveSubscribers(subscribers: string[]) {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function subscribeUser(email: string) {
  const cleanedEmail = email.trim().toLowerCase();
  if (!cleanedEmail) {
    return { success: false, error: "Email cannot be empty" };
  }

  const writeClient = getWriteClient();
  
  if (writeClient) {
    try {
      // 1. Check if email already exists in Sanity
      const existing = await writeClient.fetch(
        `*[_type == "subscriber" && email == $email][0]`,
        { email: cleanedEmail }
      );
      if (!existing) {
        // 2. Create new subscriber document
        await writeClient.create({
          _type: "subscriber",
          email: cleanedEmail,
          subscribedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Sanity subscription write failed:", err);
      return { success: false, error: "Database save failed. Please try again later." };
    }
  } else {
    // Fallback to local JSON database
    const subscribers = getSubscribers();
    if (!subscribers.includes(cleanedEmail)) {
      subscribers.push(cleanedEmail);
      saveSubscribers(subscribers);
    }
  }
  
  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("subscriber_email", cleanedEmail, { 
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  
  return { success: true };
}

export async function loginUser(email: string) {
  const cleanedEmail = email.trim().toLowerCase();
  if (!cleanedEmail) {
    return { success: false, error: "Email cannot be empty" };
  }

  const writeClient = getWriteClient();
  let isSubscribed = false;

  if (writeClient) {
    try {
      const existing = await writeClient.fetch(
        `*[_type == "subscriber" && email == $email][0]`,
        { email: cleanedEmail }
      );
      isSubscribed = !!existing;
    } catch (err) {
      console.error("Sanity subscription fetch failed:", err);
      return { success: false, error: "Database search failed. Please try again later." };
    }
  } else {
    // Fallback to local JSON database
    const subscribers = getSubscribers();
    isSubscribed = subscribers.includes(cleanedEmail);
  }
  
  if (isSubscribed) {
    const cookieStore = await cookies();
    cookieStore.set("subscriber_email", cleanedEmail, { 
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return { success: true };
  }
  
  return { success: false, error: "This email is not subscribed yet. Please subscribe first!" };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("subscriber_email");
  return { success: true };
}

export async function getSession() {
  const cookieStore = await cookies();
  const email = cookieStore.get("subscriber_email")?.value;
  return email ? { email } : null;
}
