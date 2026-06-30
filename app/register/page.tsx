import Image from "next/image";
import Link from "next/link";
import {
  IconDeviceMobile,
  IconEye,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export default function RegisterPage() {
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

            <form className="space-y-[16px]">
              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconUser size={16} stroke={1.7} />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
                />
              </label>

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconMail size={16} stroke={1.7} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
                />
              </label>

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconDeviceMobile size={16} stroke={1.7} />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
                />
              </label>

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconLock size={16} stroke={1.7} />
                <input
                  type="password"
                  placeholder="Password"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
                />
                <IconEye size={15} stroke={1.6} className="text-[#8A8A8A]" />
              </label>

              <label className="flex h-[49px] items-center gap-4 border border-[#2D2D2D] px-4 text-[#2A0C00]">
                <IconLock size={16} stroke={1.7} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#2A0C00] outline-none placeholder:text-[#8A8A8A]"
                />
              </label>

              <label className="flex items-center gap-2 text-[12px] text-[#5A514B]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="size-3 accent-[#2A0C00]"
                />
                Accept Terms &amp; Condition
              </label>

              {/* <p className="text-[12px] text-red-600">
                Weak Password. Please use a strong password
              </p> */}

              <Button className="h-[43px] w-full rounded-[3px] bg-[#2A0C00] text-[14px] font-semibold text-white hover:bg-[#3A1403]">
                Sign Up
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
