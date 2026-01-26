import dynamic from 'next/dynamic';
import Hero from "@/components/sections/hero/Hero";

// Ленивая загрузка всех компонентов кроме Hero
const Events = dynamic(() => import("@/components/sections/events/Events"));
const About = dynamic(() => import("@/components/sections/about/About"));
const LineImg = dynamic(() => import("@/components/sections/lineImg"));
const Advantages = dynamic(() => import("@/components/sections/advantages"));
const Menu = dynamic(() => import("@/components/sections/menu/Menu"));
const Reviews = dynamic(() => import("@/components/sections/reviews/reviews"));
const Contact = dynamic(() => import("@/components/sections/contact"));
const Footer = dynamic(() => import("@/components/shared/footer"));

export default function Home() {
  return (
    <main>
      <Hero/>
      <Events/>
      <About/>
      <LineImg/>
      <Advantages/>
      <Menu/>
      <Reviews/>
      <Contact/>
      <Footer/>
    </main>
  );
}