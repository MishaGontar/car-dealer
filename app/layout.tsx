import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "Car dealer",
};

interface RootProps {
    children: ReactNode;
}

export default function RootLayout({children}: Readonly<RootProps>) {
    return (
        <html lang="en">
        <body className="antialiased">
        {children}
        </body>
        </html>
    );
}
