"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconDeviceMobile,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signUpAction } from "@/server/modules/auth/auth.actions";

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast.error("Please accept the Terms & Conditions.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || " ";

    startTransition(async () => {
      const result = await signUpAction({
        email,
        password,
        firstName,
        lastName,
        phone: phone || undefined,
      });

      if (result.success) {
        toast.success(result.message);
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        if (typeof result.error === "object" && result.error !== null) {
          const errors = Object.values(result.error).flat().join(", ");
          toast.error(errors);
        } else {
          toast.error(typeof result.error === "string" ? result.error : "Registration failed.");
        }
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#7F5240] text-[#2A0C00]">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[50%_50%]">
        <section className="relative hidden min-h-screen overflow-hidden md:block">
          <Image
            src="/login-bg.png"
            alt="Purple Elegance model"
            fill
            priority
            className="object-cover object-[center_38%]"
            sizes="50vw"
          />
        </section>

        <section className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#E7D0B3] to-[#7F5240] px-5 py-10 sm:px-8">
          <div className="w-full max-w-[472px] rounded-[3px] bg-white px-5 py-7 shadow-[0_12px_28px_rgba(42,12,0,0.2)] sm:px-6 md:px-[22px]">
            <div className="mb-5 flex justify-center">
              <Image
                src="/main-logo.png"
                alt="Purple Elegance"
                width={190}
                height={126}
                priority
                className="h-auto w-[174px] object-contain"
              />
            </div>

            <div className="-mt-2 mb-6 text-center">
              <h1 className="text-[34px] leading-none font-semibold text-[#111]">
                Register
              </h1>
              <p className="mt-2 text-[13px] leading-none text-[#2A0C00]">
                Create Your Account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-[16px]">
              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconUser size={16} stroke={1.7} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  required
                  disabled={isPending}
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
                />
              </label>

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconMail size={16} stroke={1.7} />
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

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconDeviceMobile size={16} stroke={1.7} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number"
                  disabled={isPending}
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
                />
              </label>

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconLock size={16} stroke={1.7} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconLock size={16} stroke={1.7} />
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

              <label className="flex items-center gap-2 text-[12px] text-[#5A514B] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  disabled={isPending}
                  className="size-3 accent-[#2A0C00] cursor-pointer"
                />
                Accept Terms &amp; Condition
              </label>

              <Button
                type="submit"
                disabled={isPending}
                className="h-[43px] w-full rounded-[3px] bg-[#2A0C00] text-[14px] font-semibold text-white hover:bg-[#3A1403]"
              >
                {isPending ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-5 text-center text-[12px] text-[#5A514B]">
              Already Have An Account ?{" "}
              <Link href="/login" className="font-bold text-[#2A0C00]">
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

