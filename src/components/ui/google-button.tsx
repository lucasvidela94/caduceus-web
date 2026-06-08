import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            cancel_on_tap_outside?: boolean;
            context?: "signin" | "signup" | "use";
            ux_mode?: "popup" | "redirect";
            itp_support?: boolean;
            auto_select?: boolean;
            nonce?: string;
            state?: string;
          }) => void;
          renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

interface GoogleButtonProps {
  onSuccess: (credential: string) => void;
  isPending?: boolean;
}

/**
 * Google Sign-In button rendered via Google Identity Services (GIS).
 *
 * Loads the GIS script once, then renders Google's branded button.
 * The credential (ID token JWT) is returned via onSuccess.
 *
 * Uses a ref for the callback to avoid re-initializing GIS on every render
 * (the parent often passes an inline arrow function for onSuccess).
 * Configures itp_support for Safari/iOS ITP compatibility.
 */
export function GoogleButton({ onSuccess, isPending }: GoogleButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onSuccess);

  // Always keep the ref in sync with the latest callback
  callbackRef.current = onSuccess;

  const initGIS = useCallback(() => {
    if (!window.google?.accounts) return;

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (response) => callbackRef.current(response.credential),
      cancel_on_tap_outside: false,
      // Force popup mode explicitly
      ux_mode: "popup",
      // Safari/iOS ITP (Intelligent Tracking Prevention) — evita caer al flujo
      // de redirect que manda al usuario a accounts.google.com/gsi/transform
      itp_support: true,
    });

    if (containerRef.current) {
      const width = containerRef.current.clientWidth || 350;
      window.google.accounts.id.renderButton(containerRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        width,
      });
    }
  }, []);

  useEffect(() => {
    if (!CLIENT_ID) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not set");
      return;
    }

    // Si el script ya cargó, inicializar directamente
    if (window.google?.accounts) {
      initGIS();
      return;
    }

    // Cargar el script una sola vez
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGIS;
    document.head.appendChild(script);

    // Cleanup: remover el script al desmontar (evita duplicados en StrictMode)
    return () => {
      if (script.parentNode === document.head) {
        document.head.removeChild(script);
      }
    };
  }, [initGIS]);

  if (!CLIENT_ID) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`flex justify-center ${isPending ? "pointer-events-none opacity-50" : ""}`}
    />
  );
}
