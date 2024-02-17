import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/providers/themeProvider";
import AuthProvider from "@/providers/authProvider";
import GlobalStateProvider from "@/context";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "YenHa Blog",
  description: "Welcome to my digital space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <GlobalStateProvider>
            <ThemeProvider>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </GlobalStateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
