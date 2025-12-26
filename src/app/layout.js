import { Inter, Oswald, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata = {
  title: "BnM Style - 패션 매거진",
  description: "최신 패션 트렌드, 스타일 가이드, 뷰티 팁을 제공하는 프리미엄 패션 매거진",
  keywords: "패션, 스타일, 트렌드, 뷰티, 라이프스타일",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${inter.variable} ${oswald.variable} ${caveat.variable}`}>
      <body suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
