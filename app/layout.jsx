import "@/styles/globals.css";
import AppProviders from "@/providers/providers";
import AppNavbar from "@/components/navbar/navbar";
import AppFooter from "@/components/common/Footer";
import AppBackground from "/components/common/appBackground";

export const metadata = {
  title: "MHSSCOE ACM CHAPTER",
  description:
    "MHSSCOE ACM CHAPTER is a student chapter started by M. H. Saboo Siddik College Of Engineering in 2014. The chapter has successfully conducted various workshops, seminars and industrial visits for the students.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-background text-foreground">
        <AppProviders>
          <AppBackground />
          <div className="flex overflow-hidden relative flex-col min-h-screen">
            <AppNavbar />
            <main className="flex-grow mx-auto w-full max-w-[2000px] px-4 sm:px-6 lg:px-8 py-6 min-h-[calc(100vh-64px-40px)]">
              {children}
            </main>
            <AppFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
