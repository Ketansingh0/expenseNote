import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particle = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <div className="absolute inset-0 z-0">
      {" "}
      <Particles
        id="expense-note-particles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: { value: "#000" },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffcc00",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
              animation: {
                enable: true, // Add subtle opacity animation
                speed: 0.5,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
              animation: {
                enable: true, // Add subtle size animation
                speed: 1,
                minimumValue: 1,
                sync: false,
              },
            },
            links: {
              enable: false, // No connecting lines
            },
            move: {
              enable: true,
              speed: 1, // Slightly slower movement
              outModes: {
                default: "out",
              },
              direction: "none", // Particles move randomly in all directions
              random: true,
              straight: false,
              attract: {
                enable: false,
              },
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Particle;
