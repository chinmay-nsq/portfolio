import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import About from "@/components/sections/About";
import Mission from "@/components/sections/Mission";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Mission />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </>
  );
}
