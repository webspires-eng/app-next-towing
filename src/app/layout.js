import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Next Tow | Rapid Roadside & Recovery",
  description:
    "24/7 towing, roadside rescue, and nationwide logistics with specialist crews and transparent pricing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
