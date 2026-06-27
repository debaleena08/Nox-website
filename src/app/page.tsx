import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Interaction } from "@/components/Interaction";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
// import { Packages } from "@/components/Packages";
import { FAQ } from "@/components/FAQ";
import { About } from "@/components/About";

import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Interaction />
        <Services />
        <Work />
        <Process />
        {/* <Packages /> */}
        <FAQ />
        <About />
      </main>
      <Footer />
    </>
  );
}
