import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Problem", target: "problem" },
    { name: "Solution", target: "solution" },
    { name: "Traction", target: "traction" },
  ];

  const handleNavClick = (targetId: string) => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    smoothScrollTo(targetId);
  };

  return (
    <header 
      className={cn(
        "fixed w-full bg-white dark:bg-slate-900 z-50 transition-all duration-300",
        isScrolled ? "shadow-sm" : ""
      )}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 2H5C3.346 2 2 3.346 2 5v2.831c0 1.053.382 2.01 1 2.746V19c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3v-8.424c.618-.735 1-1.692 1-2.746V5c0-1.654-1.346-3-3-3zm1 5.831c0 1.014-.709 1.833-1.673 2.022A1.993 1.993 0 0 1 17 10H7a1.993 1.993 0 0 1-1.327-.148C4.709 9.664 4 8.846 4 7.831V5c0-.551.449-1 1-1h14c.551 0 1 .449 1 1v2.831zM18 19c0 .551-.449 1-1 1H7c-.551 0-1-.449-1-1v-7h12v7z"/>
            <circle cx="8.5" cy="14.5" r="1.5"/>
            <circle cx="15.5" cy="14.5" r="1.5"/>
          </svg>
          <span className="text-xl font-bold text-primary">MemoTag</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="hover:text-primary transition-colors"
            >
              {item.name}
            </button>
          ))}
          <Button onClick={() => handleNavClick("contact")}>
            Get Started
          </Button>
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-slate-900 shadow-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleNavClick(item.target)}
                  className="block py-2 w-full text-left hover:text-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <Button 
                onClick={() => handleNavClick("contact")}
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
