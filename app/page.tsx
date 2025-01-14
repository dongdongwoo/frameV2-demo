import { Metadata } from "next";
import App from "./app";

const frameMetadata = {
  version: "next",
  imageUrl: "https://i.imgur.com/q3bvlBj.png",
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "My Frame App",
      url: "https://271f-175-209-162-195.ngrok-free.app/",
      splashImageUrl: "https://i.imgur.com/H8yDhgC.png",
      splashBackgroundColor: "#ffffff",
    },
  },
};

export const metadata: Metadata = {
  title: "My FrameV2 App",
  description: "A FrameV2 for Farcaster",
  openGraph: {
    title: "My FrameV2 App Demo",
    description: "A Frame for Farcaster",
  },
  other: {
    "fc:frame": JSON.stringify(frameMetadata),
  },
};

export default function Home() {
  return <App />;
}
