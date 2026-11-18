import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gokul & Indhuja | Wedding Reception",
  description: "Together with our families, we invite you to celebrate the wedding reception of Gokul and Indhuja.",
  metadataBase: new URL("https://naveen-dharshini.vercel.app"),
  openGraph: {
    title: "Gokul & Indhuja  | Wedding Reception",
    description: "A celebration of love, family and forever.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
