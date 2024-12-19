import "./globals.css";

export const metadata = {
  title: "Thomas Melachos - Fase 2",
  description: "Thomas Melachos - FIAP - Tech Challenge - Fase 2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
