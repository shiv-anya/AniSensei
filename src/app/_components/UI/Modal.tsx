"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ModalPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.getElementById("modal-root"));
    setMounted(true);
  }, []);

  return mounted && portal ? createPortal(children, portal) : null;
}
