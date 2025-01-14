"use client";

import dynamic from "next/dynamic";

const Demo = dynamic(() => import("~/app/components/Demo"), {
  ssr: false,
});

export default function App(
  { title }: { title?: string } = { title: "Frames v2 Demo" }
) {
  return <Demo />;
}
