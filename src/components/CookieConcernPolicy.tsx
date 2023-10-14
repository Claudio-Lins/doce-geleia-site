"use client";
import Link from "next/link";
import CookieConsent from "react-cookie-consent";

export function CookieConsentPolicy() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Aceitar"
      cookieName="myAwesomeCookieName2"
      expires={150}
      style={{
        background: "#000101",
        fontSize: "14px",
        color: "#fff",
        fontFamily: "sans-serif",
        fontWeight: "500",
        textAlign: "center",
        padding: "16px 8px",
      }}
      buttonStyle={{
        color: "#000",
        fontSize: "13px",
        background: "#fff",
      }}
    >
      <div className="font-montserrat">
        Utilizamos cookies para melhorar a sua experiência no nosso site. Leia
        sobre como usamos cookies na nossa
        <Link className="text-yellow-400 mx-2 hover:underline" href="/policy">
          Política de Privacidade.
        </Link>
        Ao navegar neste site, você concorda com a nossa utilização de cookies.
      </div>
    </CookieConsent>
  );
}
