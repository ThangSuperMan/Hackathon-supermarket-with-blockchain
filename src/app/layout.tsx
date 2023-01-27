import Navbar from "@/components/navbar";
import Web3Provider from "@/context/web3-provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Web3Provider>
          <>
            <Navbar />
            {children}
          </>
        </Web3Provider>
      </body>
    </html>
  );
}
