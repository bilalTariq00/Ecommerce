
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Layout } from "./components/HomePage/pages";
import { StateContext } from "./context/StateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      
        <body className={inter.className}>
        <StateContext>
            <Layout>
                <Toaster />
                  {children} 
            </Layout>
        </StateContext>
        </body>
     
    </html>
    
  );
}
