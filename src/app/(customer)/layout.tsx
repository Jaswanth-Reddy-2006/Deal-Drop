import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="flex-1 w-full flex flex-col pt-20">
                {children}
            </main>
            <Footer />
        </>
    );
}
