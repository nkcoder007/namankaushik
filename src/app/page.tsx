import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Personality } from "@/components/sections/Personality";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    // tabIndex={-1} lets the skip link move focus into main instead of only scrolling to it.
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <Hero />
      <About />

      <Experience />

      <Projects />

      <Personality />

      <Contact />
    </main>
  );
}
