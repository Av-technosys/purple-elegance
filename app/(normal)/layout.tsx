import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { getCurrentUser } from "@/lib/auth";

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser();

    return <>
        <Header user={user} />
        {children}
        <Footer/>
    </>
}
