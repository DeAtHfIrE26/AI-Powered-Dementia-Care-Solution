import Header from "@/components/MemoTag/Header";
import HeroSection from "@/components/MemoTag/HeroSection";
import ProblemSection from "@/components/MemoTag/ProblemSection";
import SolutionSection from "@/components/MemoTag/SolutionSection";
import TractionSection from "@/components/MemoTag/TractionSection";
import CTASection from "@/components/MemoTag/CTASection";
import Footer from "@/components/MemoTag/Footer";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { smoothScrollTo } from "@/lib/utils";

export default function Home() {
  const [location] = useLocation();

  useEffect(() => {
    // Check for hash in URL to handle direct links
    if (location && location.includes('#')) {
      const sectionId = location.split('#')[1];
      setTimeout(() => {
        smoothScrollTo(sectionId);
      }, 100);
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <TractionSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
