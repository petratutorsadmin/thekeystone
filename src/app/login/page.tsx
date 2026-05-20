import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reader Log In",
  description: "Log in to your subscription on The Keystone reader portal.",
  keywords: ["Log in", "Reader portal", "Keystone subscription", "Petra Tutors"],
};

export default function LoginPage() {
  return <LoginForm />;
}
