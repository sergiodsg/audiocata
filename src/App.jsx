import HALO from "vanta/src/vanta.halo";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    HALO({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      size: 2,
    });
  }, []);

  return (
    <div className="background-fallback h-screen">
      <div id="vanta" className="h-screen">
        <h1 className="text-3xl text-white">Audiocata</h1>
        <button className="btn">Button</button>
      </div>
    </div>
  );
}

export default App;
