import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerenciamento",
  description: "Gerencie seus cliente e atendimentos de forma fácil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Header />
            {children}
            <ToastContainer 
              autoClose={5000}
              closeButton={false}
              hideProgressBar={false}
              pauseOnHover={false}
              draggable={false}
              closeOnClick={false}
            />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
