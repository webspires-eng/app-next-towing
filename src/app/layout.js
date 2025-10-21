import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Next Towing | 24/7 Vehicle Recovery",
  description:
    "Rapid response towing, roadside recovery, and breakdown assistance for Greater Manchester and beyond.",
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
