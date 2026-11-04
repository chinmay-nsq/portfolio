import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import Performance from "@/components/sections/Performance";
import Work from "@/components/sections/Work";
import Projects from "@/components/sections/Projects";
import Specs from "@/components/sections/Specs";
import History from "@/components/sections/History";
import Order from "@/components/sections/Order";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Performance />
      <Work />
      <Projects />
      <Specs />
      <History />
      <Order />
    </>
  );
}
