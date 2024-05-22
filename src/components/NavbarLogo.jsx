import React from "react";

export default function NavbarLogo({ src, text, alt }) {
  return (
    <button className="btn btn-ghost normal-case text-2xl">
      <img src={src} alt={alt} className="h-9 w-9" />
      {text}
    </button>
  );
}