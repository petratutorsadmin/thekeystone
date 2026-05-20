"use server";

import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "src/lib/subscribers.json");

// Helper to ensure file exists and read subscribers
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

// Helper to save subscribers
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

  const subscribers = getSubscribers();
  if (!subscribers.includes(cleanedEmail)) {
    subscribers.push(cleanedEmail);
    saveSubscribers(subscribers);
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

  const subscribers = getSubscribers();
  
  if (subscribers.includes(cleanedEmail)) {
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
