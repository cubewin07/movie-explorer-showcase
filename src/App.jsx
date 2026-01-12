import { useRef } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Orientation from "./components/acts/Orientation";
import Discovery from "./components/acts/Discovery";
import Connection from "./components/acts/Connection";
import Feedback from "./components/acts/Feedback";
import Resilience from "./components/acts/Resilience";
import Cohesion from "./components/acts/Cohesion";
import { ReactLenis } from 'lenis/react'

function App() {
  return (
    <ReactLenis root>
      <main className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 overflow-clip">
        <Hero />
        <div id="features" className="space-y-32 pb-32">
           <Orientation />
           <Discovery />
           <Connection />
           <Feedback />
           <Resilience />
           <Cohesion />
        </div>
      </main>
    </ReactLenis>
  );
}

export default App;
