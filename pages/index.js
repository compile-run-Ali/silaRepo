import Image from "next/image";
import { Inter } from "next/font/google";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import Home from "@/components/Hero/Hero";

// const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <BaseLayout title={"Home"}>
      <Home />
    </BaseLayout>
  );
}
