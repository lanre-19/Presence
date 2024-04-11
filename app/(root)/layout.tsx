import StreamVideoProvider from "@/providers/stream-client-provider";

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <main>
            <StreamVideoProvider>
              {children}
            </StreamVideoProvider>
        </main>
    );
}
 
export default RootLayout;