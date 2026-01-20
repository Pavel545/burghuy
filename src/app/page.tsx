import About from "@/components/sections/about/About";
import Advantages from "@/components/sections/advantages";
import Contact from "@/components/sections/contact";
import Events from "@/components/sections/events/Events";
import Hero from "@/components/sections/hero/Hero";
import Menu from "@/components/sections/menu/Menu";
import { Reviews } from "@/components/sections/reviews/reviews";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
   <main>
      <Hero/>
      <Events/>
      <About/>
      <Advantages/>
      <Menu/>
      <Reviews/>
      <Contact/>
      <Footer/>
   </main>
  );
}
