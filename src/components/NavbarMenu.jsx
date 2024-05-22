import React from "react";
import { FiMenu } from "react-icons/fi";
import { useStore } from "../store";

export default function NavbarMenu() {
  const { setShow } = useStore();

  return (
    <button className="btn btn-ghost drawer-button" onClick={setShow}>
      <FiMenu className="w-6 h-6" />
    </button>
  );
}