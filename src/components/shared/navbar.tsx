"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Find Us", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brew-warm-white/90 backdrop-blur-md shadow-sm border-b border-brew-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-[var(--font-heading)] text-xl font-bold text-brew-green-dark">
            Brew Truck
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-brew-text-muted hover:text-brew-green transition-all duration-200 rounded-full hover:bg-brew-cream"
            >
              {link.label}
            </a>
          ))}
          <a href="#menu">
            <Button size="sm" className="ml-2 rounded-full bg-brew-green hover:bg-brew-green-dark text-white transition-all duration-200">
              Order Now
            </Button>
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-brew-text-muted hover:bg-brew-cream transition-all duration-200">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-brew-warm-white">
            <div className="flex flex-col gap-1 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-brew-text-muted hover:text-brew-green hover:bg-brew-cream rounded-full transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a href="#menu" onClick={() => setOpen(false)} className="mt-4 px-4">
                <Button className="w-full rounded-full bg-brew-green hover:bg-brew-green-dark text-white transition-all duration-200">
                  Order Now
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
