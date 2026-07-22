"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { confirmSignUpAction, resendConfirmationCodeAction } from "@/server/modules/auth/auth.actions";

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isResending, startResendTransition] = useTransition();

  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("Missing email address. Please sign up or login first.");
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
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const val = otp[index];
      if (val === "") {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) {
          (prevInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter all 6 digits.");
      return;
    }
    if (!email) {
      toast.error("Email is required for verification.");
      return;
    }

    startTransition(async () => {
      const result = await confirmSignUpAction({ email, code });
      if (result.success) {
        toast.success(result.message);
        setIsSuccessOpen(true);
      } else {
        toast.error(typeof result.error === "string" ? result.error : "Verification failed.");
      }
    });
  };

  const handleResend = () => {
    if (!email) {
      toast.error("Email is required to resend verification code.");
      return;
    }

    startResendTransition(async () => {
      const result = await resendConfirmationCodeAction({ email });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(typeof result.error === "string" ? result.error : "Failed to resend code.");
      }
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white px-5 py-10 text-[#2A0C00]">
      <section className="w-full max-w-[430px]">
        <Link
          href="/login"
          className="mb-5 inline-flex items-center gap-2 text-[14px] text-[#4D4D4D] hover:text-[#2A0C00]"
        >
          <IconArrowLeft size={16} stroke={1.8} />
          Back to Login
        </Link>

        <h1 className="text-[32px] leading-none font-semibold text-[#111] sm:text-[34px]">
          OTP Verification
        </h1>
        <p className="mt-1 text-[12px] text-[#4D4D4D]">
          Verify OTP to Sign up {email ? `for ${email}` : ""}
        </p>

        <div className="mt-6 grid grid-cols-6 gap-[18px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
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
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>
      </section>

      {isSuccessOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-5 animate-fade-in">
          <section className="w-full max-w-[416px] rounded-[10px] bg-white px-9 py-12 text-center shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
            <div className="mx-auto flex size-[132px] items-center justify-center rounded-full bg-[#DDEDE5]">
              <div className="flex size-[104px] items-center justify-center rounded-full bg-[#98D1B2]">
                <div className="flex size-[82px] items-center justify-center rounded-full bg-[#0E8B42]">
                  <IconCheck size={58} stroke={1.9} className="text-white" />
                </div>
              </div>
            </div>

            <h2 className="mt-10 text-[22px] leading-tight font-semibold text-[#111]">
              Email Verified Successfully
            </h2>
            <p className="mx-auto mt-4 max-w-[306px] text-[12px] leading-5 text-[#666]">
              Your email verification is successfully completed.
            </p>

            <Button
              asChild
              className="mt-8 h-[43px] w-full rounded-[3px] bg-[#123135] text-[12px] font-semibold text-white hover:bg-[#173f44]"
            >
              <Link href="/login">Login</Link>
            </Button>
          </section>
        </div>
      ) : null}
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Loading verification details...</p>
      </div>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}

