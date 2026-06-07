import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            cancel_on_tap_outside?: boolean;
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
 * Loads the GIS script on first mount, then renders Google's branded
 * "Continuar con Google" button inside the component. The credential
 * (ID token JWT) is returned via onSuccess.
 */
export function GoogleButton({ onSuccess, isPending }: GoogleButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CLIENT_ID) {
      console.warn("VITE_GOOGLE_CLIENT_ID is not set");
      return;
    }

    if (!window.google?.accounts) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGIS;
      document.head.appendChild(script);
    } else {
      initGIS();
    }

    function initGIS() {
      if (!window.google?.accounts) return;

      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => onSuccess(response.credential),
        cancel_on_tap_outside: false,
      });

      if (containerRef.current) {
        window.google.accounts.id.renderButton(containerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          width: 400,
        });
      }
    }
  }, [onSuccess]);

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
