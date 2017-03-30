export function returnParticleConfiguration() {
  const particleConfigurations = [
    { // Bubble Particles
      particles: {
        color: {
          value: '#fff'
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          out_mode: 'out',
          speed: 1.5,
          straight: false
        },
        number: {
          value: 20
        },
        opacity: {
          anim: {
            enable: true,
            opacity_min: 0.3,
            speed: 0.5,
            sync: false
          },
          random: true,
          value: 0.4
        },
        shape: {
          polygon: {
            nb_sides: 6
          },
          type: ['polygon']
        },
        size: {
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.3,
            sync: false
          },
          random: true,
          value: 30
        }
      }
    },
    {
      particles: { // Default Particles
        color: {
          value: '#fff'
        },
        line_linked: {
          shadow: {
            blur: 5,
            color: '#fff',
            enable: true
          }
        },
        number: {
          value: 50
        }
      }
    },
    {
      particles: { // NASA Particles
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#fff"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: false
        },
        move: { 
          enable: true, 
          speed: 1, 
          direction: "none", 
          random: true, 
          straight: false, 
          out_mode: "out", 
          bounce: false, 
          attract: { 
            "enable": false
          } 
        }
      }
    }
  ];

  return particleConfigurations[Math.floor(Math.random() * particleConfigurations.length)];
}