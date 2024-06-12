import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Netflix Cluster",
  description: "Netflix Cluster with Tensorflow",
  creator: "Diego Ivan Perea Montealegre",
   icons: {
    icon: './icon.ico', // Ruta correcta del ícono
  }, 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}