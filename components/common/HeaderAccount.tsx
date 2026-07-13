import { Button } from "@/components/ui/button";
import Link from "next/link";

export type HeaderAccountUser = {
  name: string;
  email: string;
  avatar?: string | null;
};

export default function HeaderAccount({
  user,
}: {
  user?: HeaderAccountUser | null;
}) {
  if (user) {

    return (
      <div className="flex items-center gap-1 py-1">
        <div className="min-w-0 text-[#140A05]">
          <p className="truncate text-[20px] leading-tight font-semibold">
            {user.name}
          </p>
          <p className="mt-1 truncate text-[10px] leading-none text-[#5C514C]">
            {user.email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-0">
     
      <Button asChild className="h-[35px] rounded-none bg-[#351300] text-[12px] font-semibold text-white hover:bg-[#4A1B04]">
        <Link href={"/login"}> Login</Link>
      </Button>
  
      <Button
        asChild
        variant="outline"
        className="h-[35px] rounded-none border-[#351300] bg-white text-[12px] font-semibold text-[#140A05] hover:bg-[#F8EAD8]"
      >
       <Link href={"/register"}>  Sign Up</Link>
      </Button>
    </div>
  );
}
