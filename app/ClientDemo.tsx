"use client";

import dynamic from "next/dynamic";

const Demo = dynamic(() => import("~/app/components/Demo"), {
  ssr: false,
});

export default function ClientDemo() {
  return <Demo />;
}
