"use client";

import { useState } from "react";
import Link from "next/link";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

const otpDigits = ["8", "0", "0", "8", "5", "5"];

export default function VerifyOtpPage() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

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
          Verify OTP to Sign up
        </p>

        <div className="mt-6 grid grid-cols-6 gap-[18px]">
          {otpDigits.map((digit, index) => (
            <input
              key={`${digit}-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              defaultValue={digit}
              aria-label={`OTP digit ${index + 1}`}
              className="h-[48px] w-full rounded-[3px] border border-[#2D2D2D] bg-white text-center text-[14px] text-[#111] outline-none"
            />
          ))}
        </div>

        <Button
          type="button"
          onClick={() => setIsSuccessOpen(true)}
          className="mt-7 h-[45px] w-full rounded-[3px] bg-[#2A0C00] text-[14px] font-semibold text-white hover:bg-[#3A1403]"
        >
          Verify OTP
        </Button>
      </section>

      {isSuccessOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-5">
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
