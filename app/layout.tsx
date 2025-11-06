import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Automação N8N - Telegram para Blogger",
  description: "Automação para processar mensagens do Telegram e publicar no Blogger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
