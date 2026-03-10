"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AdminProvider, useAdmin } from "@/contexts/admin-context";
import {
  ClipboardList,
  UtensilsCrossed,
  BarChart3,
  Settings,
  Volume2,
  VolumeX,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { soundEnabled, setSoundEnabled } = useAdmin();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-brew-warm-white">
      {/* ─── Desktop Sidebar (md+) ─── */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[200px] bg-white border-r border-brew-border flex-col z-40">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-brew-border/50">
          <Link href="/admin/orders" className="flex items-center gap-2.5">
            <Image
              src="/Brew_logo.png"
              alt="Brew Truck"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-heading text-base text-brew-text">
              Brew Truck
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brew-green/10 text-brew-green border-l-2 border-brew-green"
                    : "text-brew-text-muted hover:bg-brew-cream hover:text-brew-text"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-brew-border/50 space-y-1">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brew-text-muted hover:bg-brew-cream hover:text-brew-text transition-colors w-full"
          >
            {soundEnabled ? (
              <Volume2 className="w-4.5 h-4.5" />
            ) : (
              <VolumeX className="w-4.5 h-4.5 text-red-500" />
            )}
            {soundEnabled ? "Sound On" : "Sound Off"}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brew-text-muted hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="w-4.5 h-4.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* ─── Mobile Top Header ─── */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-brew-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/admin/orders" className="flex items-center gap-2">
            <Image
              src="/Brew_logo.png"
              alt="Brew Truck"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="font-heading text-base text-brew-text">
              Brew Truck
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brew-cream transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-brew-text-muted" />
              ) : (
                <VolumeX className="w-4 h-4 text-red-500" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brew-cream transition-colors"
            >
              <LogOut className="w-4 h-4 text-brew-text-muted" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="md:ml-[200px] pb-[72px] md:pb-0">{children}</main>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brew-border">
        <div className="flex items-center justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
                  isActive ? "text-brew-green" : "text-brew-text-muted"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <DashboardShell>{children}</DashboardShell>
    </AdminProvider>
  );
}
