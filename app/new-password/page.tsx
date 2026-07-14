"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { IconArrowLeft, IconCheck, IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { confirmForgotPasswordAction } from "@/server/modules/auth/auth.actions";

function NewPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    if (!email || !code) {
      toast.error("Invalid reset session. Missing email or code.");
    }
  }, [email, code]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !code) {
      toast.error("Missing required verification parameters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const result = await confirmForgotPasswordAction({
        email,
        code,
        newPassword: password,
      });

      if (result.success) {
        toast.success(result.message);
        setIsSuccessOpen(true);
      } else {
        if (typeof result.error === "object" && result.error !== null) {
          const errors = Object.values(result.error).flat().join(", ");
          toast.error(errors);
        } else {
          toast.error(typeof result.error === "string" ? result.error : "Failed to update password.");
        }
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
          Set New Password
        </h1>
        <p className="mt-1 text-[12px] text-[#4D4D4D]">
          Enter your new password to secure your account {email ? `for ${email}` : ""}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <label className="flex h-[50px] items-center gap-4 rounded-[3px] border border-[#2D2D2D] px-4 text-[#2A0C00]">
            <IconLock size={18} stroke={1.7} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
              disabled={isPending}
              className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isPending}
              className="text-[#8A8A8A] focus:outline-none"
            >
              {showPassword ? <IconEyeOff size={15} stroke={1.6} /> : <IconEye size={15} stroke={1.6} />}
            </button>
          </label>

          <label className="flex h-[50px] items-center gap-4 rounded-[3px] border border-[#2D2D2D] px-4 text-[#2A0C00]">
            <IconLock size={18} stroke={1.7} />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
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
            {isPending ? "Updating Password..." : "Update Password"}
          </Button>
        </form>
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
              Password Reset Successfully
            </h2>
            <p className="mx-auto mt-4 max-w-[306px] text-[12px] leading-5 text-[#666]">
              Your password has been updated, you can now login with your new
              credentials
            </p>

            <Button
              asChild
              className="mt-8 h-[43px] w-full rounded-[3px] bg-[#123135] text-[12px] font-semibold text-white hover:bg-[#173f44]"
            >
              <Link href="/login">Back to Login</Link>
            </Button>
          </section>
        </div>
      ) : null}
    </main>
  );
}

export default function NewPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Loading reset session...</p>
      </div>
    }>
      <NewPasswordContent />
    </Suspense>
  );
}

