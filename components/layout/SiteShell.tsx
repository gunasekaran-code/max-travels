"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { SearchPopup } from "./SearchPopup";
import { ChatWidget } from "./ChatWidget";
import { ScrollToTop } from "./ScrollToTop";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Header
        overlay={pathname === "/"}
        onOpenSidebar={() => setSidebarOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMobile={() => setMobileOpen(true)}
      />
      <main>{children}</main>
      <Footer />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchPopup open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ChatWidget />
      <ScrollToTop />
    </>
  );
}
