"use client";

import React from "react";
import dynamic from "next/dynamic";
import EditorNavbar from "@/components/EditorNavbar";

// Dynamically import MonacoEditor with SSR disabled
const MonacoEditor = dynamic(() => import("@/components/MonacoEditor"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <EditorNavbar className="mb-8" />
      <MonacoEditor />
    </>
  );
}
