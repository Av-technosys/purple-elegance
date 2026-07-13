"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconMail } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { forgotPasswordAction } from "@/server/modules/auth/auth.actions";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    startTransition(async () => {
      const result = await forgotPasswordAction({ email });
      if (result.success) {
        toast.success(result.message);
        router.push(`/forgot-otp?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(typeof result.error === "string" ? result.error : "Failed to send reset code.");
      }
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-10 text-[#2A0C00]">
      <section className="w-full max-w-[430px]">
        <Link
          href="/login"
          className="mb-5 inline-flex items-center gap-2 text-[14px] text-[#4D4D4D] hover:text-[#2A0C00]"
        >
          <IconArrowLeft size={16} stroke={1.8} />
          Back to Login
        </Link>

        <h1 className="text-[32px] leading-none font-semibold text-[#111] sm:text-[34px]">
          Forgot Password
        </h1>
        <p className="mt-1 text-[12px] text-[#4D4D4D]">
          Enter your registered email to receive reset link
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <label className="flex h-[50px] items-center gap-4 rounded-[3px] border border-[#2D2D2D] px-4 text-[#2A0C00]">
            <IconMail size={18} stroke={1.7} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              disabled={isPending}
              className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
            />
          </label>

          <Button
            type="submit"
            disabled={isPending}
            className="h-[45px] w-full rounded-[3px] bg-[#2A0C00] text-[14px] font-semibold text-white hover:bg-[#3A1403]"
          >
            {isPending ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>

        <p className="mt-6 text-center text-[12px] text-[#4D4D4D]">
          Don&apos;t Have An Account?{" "}
          <Link href="/register" className="font-semibold text-[#111] underline">
            Create Account
          </Link>
        </p>
      </section>
    </main>
  );
}

