"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { resendConfirmationCodeAction } from "@/server/modules/auth/auth.actions";

function ForgotOtpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();

  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    if (!email) {
      toast.error("Missing email address. Please request a password reset first.");
    }
  }, [email]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const val = element.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val !== "") {
      const nextInput = document.getElementById(`forgot-otp-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const val = otp[index];
      if (val === "") {
        const prevInput = document.getElementById(`forgot-otp-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter all 6 digits of the reset code.");
      return;
    }
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    // Direct user to set new password with email and code
    router.push(`/new-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`);
  };

  const handleResend = () => {
    if (!email) {
      toast.error("Email is required to resend the code.");
      return;
    }

    startResendTransition(async () => {
      const result = await resendConfirmationCodeAction({ email });
      if (result.success) {
        toast.success("Verification code resent to your email.");
      } else {
        toast.error(typeof result.error === "string" ? result.error : "Failed to resend code.");
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
          Verify OTP to Reset Password {email ? `for ${email}` : ""}
        </p>

        <div className="mt-6 grid grid-cols-6 gap-[18px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`forgot-otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={isPending}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`OTP digit ${index + 1}`}
              className="h-[48px] w-full rounded-[3px] border border-[#2D2D2D] bg-white text-center text-[14px] text-[#111] outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600/20"
            />
          ))}
        </div>

        <div className="mt-4 text-right">
          <button
            type="button"
            onClick={handleResend}
            disabled={isPending || isResending}
            className="text-[12px] text-violet-600 hover:text-violet-800 underline font-medium disabled:opacity-50"
          >
            {isResending ? "Resending code..." : "Resend OTP Code"}
          </button>
        </div>

        <Button
          type="button"
          onClick={handleVerify}
          disabled={isPending}
          className="mt-7 h-[45px] w-full rounded-[3px] bg-[#2A0C00] text-[14px] font-semibold text-white hover:bg-[#3A1403]"
        >
          Verify OTP
        </Button>
      </section>
    </main>
  );
}

export default function ForgotOtpPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Loading code verification...</p>
      </div>
    }>
      <ForgotOtpContent />
    </Suspense>
  );
}

