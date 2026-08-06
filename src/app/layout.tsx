import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Almera | Luxury Fragrances",
    template: "%s | Almera",
  },
  description:
    "Almera is a house of luxury fragrances crafted in Egypt — discover perfumes for men, women, and unisex with notes that endure.",
  keywords: [
    "Almera",
    "luxury perfume",
    "Egypt perfume",
    "fragrance",
    "eau de parfum",
    "perfume Egypt",
  ],
  openGraph: {
    title: "Almera | Luxury Fragrances",
    description:
      "Discover Almera's collection of luxury fragrances, crafted for those who leave an impression.",
    type: "website",
    locale: "en_US",
    siteName: "Almera",
  },
  twitter: {
    card: "summary_large_image",
    title: "Almera | Luxury Fragrances",
    description:
      "Discover Almera's collection of luxury fragrances, crafted for those who leave an impression.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={150}>
            {children}
            <Toaster position="bottom-right" richColors closeButton />
          </TooltipProvider>
        </ThemeProvider>

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
