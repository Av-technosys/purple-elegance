import Image from "next/image";
import Link from "next/link";
import { IconEye, IconLock, IconMail } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
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
          <div className="w-full max-w-[472px] rounded-[12px] bg-white px-5 py-9 shadow-[0_12px_28px_rgba(42,12,0,0.24)] sm:px-6 md:px-[22px]">
            <div className="mb-7 flex justify-center">
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
              <h1 className="text-[30px] leading-none font-semibold text-[#2A0C00]">
                Welcome Back
              </h1>
              <p className="mt-2 text-[13px] leading-none text-[#2A0C00]">
                Login To Your Account
              </p>
            </div>

            <form className="space-y-[18px]">
              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconMail size={16} stroke={1.7} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#777]"
                />
              </label>

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconLock size={16} stroke={1.7} />
                <input
                  type="password"
                  placeholder="Password"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#777]"
                />
                <IconEye size={15} stroke={1.6} className="text-[#2D2D2D]" />
              </label>

              <div className="-mt-1 text-right">
                <Link
                  href="/forgot-password"
                  className="text-[13px] text-[#2A0C00] hover:underline"
                >
                  Forgot Password ?
                </Link>
              </div>

              <Button className="h-[43px] w-full rounded-[3px] bg-[#2A0C00] text-[14px] font-semibold text-white hover:bg-[#3A1403]">
                Login
              </Button>
            </form>

            <p className="mt-6 text-center text-[12px] text-[#2A0C00]">
              Don&apos;t Have An Account?{" "}
              <Link href="/register" className="font-bold underline">
                Create Account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
