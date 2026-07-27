"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContactButton() {
    const router = useRouter();

    const handleContactClick = (e) => {
      e.preventDefault();
      // You can customize this action - open modal, navigate to contact page, etc.
      // Using Next.js router for client-side navigation (no page reload)
      router.push("/contact");
    };

  return (
    <>
      <Link
        href="https://wa.me/+919530013034"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-btn"
        aria-label="Contact Us"
        style={{
          outline: "none",
          border: "none",
          backgroundColor: "#128C7E",
        }}
      >
        <MessageCircle size={20} />
        <span className="contact-text">Whatsapp</span>
      </Link>

      <style jsx>{`
        .floating-contact-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          background-color: #000000;
          color: #ffffff;
          border: none;
          border-radius: 50px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: inherit;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
          outline: none;
          min-width: 56px;
          min-height: 56px;
          justify-content: center;
        }

        .floating-contact-btn:hover {
          background-color: #333333;
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .floating-contact-btn:active {
          transform: scale(0.95);
        }

        .floating-contact-btn:focus {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }

        .contact-text {
          white-space: nowrap;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        /* Mobile devices (up to 480px) */
        @media (max-width: 480px) {
          .floating-contact-btn {
            bottom: 20px;
            right: 20px;
            padding: 14px;
            min-width: 56px;
            min-height: 56px;
            border-radius: 50%;
          }

          .contact-text {
            display: none;
          }
        }

        /* Small tablets (481px to 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .floating-contact-btn {
            bottom: 20px;
            right: 20px;
            padding: 12px 14px;
          }

          .contact-text {
            font-size: 13px;
          }
        }

        /* Medium tablets (769px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .floating-contact-btn {
            bottom: 24px;
            right: 24px;
            padding: 12px 16px;
          }
        }

        /* Large screens (1025px and up) */
        @media (min-width: 1025px) {
          .floating-contact-btn {
            bottom: 32px;
            right: 32px;
            padding: 14px 20px;
            font-size: 15px;
          }
        }

        /* Extra large screens (1440px and up) */
        @media (min-width: 1440px) {
          .floating-contact-btn {
            bottom: 40px;
            right: 40px;
            padding: 16px 24px;
            font-size: 16px;
          }
        }

        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .floating-contact-btn {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }

          .floating-contact-btn:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          }
        }

        /* Landscape orientation adjustments */
        @media (orientation: landscape) and (max-height: 500px) {
          .floating-contact-btn {
            bottom: 16px;
            right: 16px;
            padding: 10px 12px;
            min-width: 48px;
            min-height: 48px;
          }

          .contact-text {
            font-size: 12px;
          }
        }

        /* Accessibility - Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .floating-contact-btn {
            transition: none;
          }

          .floating-contact-btn:hover {
            transform: none;
          }

          .floating-contact-btn:active {
            transform: none;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .floating-contact-btn {
            background-color: #000000;
            color: #ffffff;
          }

          .floating-contact-btn:hover {
            background-color: #1a1a1a;
          }
        }

        /* Print styles - hide the button when printing */
        @media print {
          .floating-contact-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
