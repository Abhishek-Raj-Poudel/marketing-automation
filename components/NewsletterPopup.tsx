"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { NewsletterForm } from "@/components/NewsletterForm";

const KEY = "nl-popup-seen";

export function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Never interrupt a checkout.
  useEffect(() => {
    if (pathname.startsWith("/checkout")) return;
    if (localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(t);
  }, [pathname]);

  function close() {
    localStorage.setItem(KEY, "1");
    setOpen(false);
  }

  return (
    <Modal open={open} onClose={close} label="Newsletter signup">
      <NewsletterForm variant="popup" />
    </Modal>
  );
}
