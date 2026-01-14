import About from "@/components/sections/about/About";
import Contact from "@/components/sections/contact";
import Events from "@/components/sections/events/Events";
import Hero from "@/components/sections/hero/Hero";
import Menu from "@/components/sections/menu/Menu";

export default function Home() {
  return (
   <main>
      <Hero/>
      <Events/>
      <About/>
      <Menu/>

      <Contact/>
   </main>
  );
}
