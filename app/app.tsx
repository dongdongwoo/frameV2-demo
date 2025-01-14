"use client";

import dynamic from "next/dynamic";
import Carousel from "./components/Carousel";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Demo = dynamic(() => import("~/app/components/Demo"), {
  ssr: false,
});

export default function App(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { title }: { title?: string } = { title: "Frames v2 Demo" }
) {
  // return <Demo title={title} />;
  return <Carousel />;
}
