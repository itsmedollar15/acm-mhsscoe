import "@/styles/globals.css";
import AppProviders from "@/providers/providers";
import AppNavbar from "@/components/navbar/navbar";
import AppFooter from "@/components/common/Footer";
import AppBackground from "/components/common/appBackground";
import AppLoading from "@/components/common/loading";

export const metadata = {
  title: "MHSSCOE ACM CHAPTER",
  description:
    "MHSSCOE ACM CHAPTER is a student chapter started by M. H. Saboo Siddik College Of Engineering in 2014. The chapter has successfully conducted various workshops, seminars and industrial visits for the students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <AppProviders>
          <AppBackground />
          <div className="relative flex flex-col min-h-screen">
            <AppNavbar />
            <main className="flex-grow m-5 min-h-[calc(100vh-64px-40px)]">
              {children}
            </main>
            <AppFooter />
          </div>
          {/* Temporarily commenting out preloader */}
          {/* <Preloader /> */}
        </AppProviders>
      </body>
    </html>
  );
}
