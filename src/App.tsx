import { useState, useCallback } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Intro from "./components/Intro";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Cloud from "./components/Cloud";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", position: "relative" }}>
      <LoadingScreen onDone={done} />
      {ready && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Marquee text="JAVA · SPRING BOOT · ANGULAR · POSTGRESQL · AWS · REST API · MICROSERVICES" />
            <Intro />
            <About />
            <Marquee text="FULL STACK DEVELOPER" color="#FF7A00" reverse />
            <Skills />
            <Experience />
            <Marquee text="ENTERPRISE SOLUTIONS · SCALABLE SYSTEMS · CLOUD NATIVE" />
            <Projects />
            <Cloud />
            <Achievements />
            <Education />
            <Marquee text="LET'S CONNECT · OPEN TO OPPORTUNITIES" color="#FF7A00" reverse />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}
