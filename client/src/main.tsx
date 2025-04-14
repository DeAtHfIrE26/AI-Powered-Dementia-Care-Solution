import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Inter, Source_Sans_3 } from "@/next/font/google";

// Initialize the fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
});

// Append font variables to the body
document.body.classList.add(inter.variable, sourceSans.variable);

createRoot(document.getElementById("root")!).render(<App />);
