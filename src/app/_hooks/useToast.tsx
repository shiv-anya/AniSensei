"use client";

import { useState, useCallback } from "react";
import ModalPortal from "@/app/_components/UI/Modal";
import Toast from "@/app/_components/UI/Toast";

export function useToast() {
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const showToast = useCallback(
    (type: "success" | "error" | "warning", message: string) => {
      setToast({ type, message });
    },
    []
  );

  const closeToast = useCallback(() => setToast(null), []);

  const ToastContainer = () => (
    <ModalPortal>
      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={closeToast} />
      )}
    </ModalPortal>
  );

  return { showToast, ToastContainer };
}
