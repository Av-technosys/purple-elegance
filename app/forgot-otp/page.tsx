import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

const otpDigits = ["0", "0", "0", "0", "0", "0"];

export default function ForgotOtpPage() {
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
          Verify OTP to Reset Password
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

        <Button className="mt-7 h-[45px] w-full rounded-[3px] bg-[#2A0C00] text-[14px] font-semibold text-white hover:bg-[#3A1403]">
          Verify OTP
        </Button>
      </section>
    </main>
  );
}
