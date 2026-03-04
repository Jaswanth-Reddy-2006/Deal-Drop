// This layout intentionally does NOT include Navbar or Footer
// so the login page renders as a full standalone page

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
