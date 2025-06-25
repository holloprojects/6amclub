"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AdAstraPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1),
        },
        iScrollProgress: { value: 0 },
        iMergeAmount: { value: 0 },
        iColorShift: { value: 0 },
        iBallPositions: {
          value: [
            new THREE.Vector3(-3, 2, 0),
            new THREE.Vector3(3, -2, 1),
            new THREE.Vector3(-2, -3, 2),
            new THREE.Vector3(2, 3, -1),
            new THREE.Vector3(0, 0, 3),
            new THREE.Vector3(-1, 1, -2),
            new THREE.Vector3(1, -1, -3),
            new THREE.Vector3(0, 0, 0),
          ],
        },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform float iScrollProgress;
        uniform float iMergeAmount;
        uniform float iColorShift;
        uniform vec3 iBallPositions[8];
        
        vec3 hash(vec3 p) {
          p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                   dot(p, vec3(269.5, 183.3, 246.1)),
                   dot(p, vec3(113.5, 271.9, 124.6)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }
        
        float noise(in vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          
          vec3 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(
              mix(dot(hash(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
                  dot(hash(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
              mix(dot(hash(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
                  dot(hash(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
            mix(
              mix(dot(hash(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
                  dot(hash(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
              mix(dot(hash(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
                  dot(hash(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
        }
        
        void main() {
          vec2 fragCoord = gl_FragCoord.xy;
          vec4 fragColor;
          
          vec3 dir = normalize(vec3((2.0 * fragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y), 1.7));
          vec3 p = vec3(0, 0, -7);
          vec3 gradient, q, a;
          float dist, b;
          
          for(int i = 0; i < 100; i++) {
            q = p;
            p += dir * dist;
            gradient = vec3(0);
            dist = 0.0;
            
            for(int j = 0; j < 8; j++) {
              vec3 ballp = iBallPositions[j];
              
              ballp.x += sin(iTime * 0.3 + float(j) * 0.5 + iScrollProgress * 3.0) * (3.0 - iMergeAmount * 2.5);
              ballp.y += cos(iTime * 0.2 + float(j) * 0.7 + iScrollProgress * 2.0) * (3.0 - iMergeAmount * 2.5);
              ballp.z += sin(iTime * 0.4 + float(j) * 0.3 + iScrollProgress * 4.0) * (3.0 - iMergeAmount * 2.5);
              
              ballp = mix(ballp, vec3(0.0), iMergeAmount);
              
              b = dot(a = p - ballp, a);
              
              float strength = 1.0 + iMergeAmount * 2.0;
              gradient += a / (b * b) * strength;
              dist += strength / b;
            }
            
            dist = 1.0 - dist;
            
            if(dist < 0.001) {
              dir = reflect(dir, normalize(gradient));
              p = q;
              dist = 0.0;
            }
          }
          
          // Color based on reflection direction, converted to white/grayscale
          vec3 col = dir * 0.5 + 0.5;

          // Add noise-based coloring with time and scroll animation
          float noiseVal = noise(col * 2.0 + iTime * 0.3 + iScrollProgress);

          // Convert to white/light gray instead of colors
          vec3 finalColor = vec3(1.0 - (noiseVal * 0.3)); // White with subtle gray variations

          // Ensure colors are properly mapped to output range
          finalColor = clamp(finalColor, 0.7, 1.0); // Keep it mostly white

          fragColor = vec4(finalColor, 1.0);
          gl_FragColor = fragColor;
        }
      `,
    });
    shaderMaterialRef.current = shaderMaterial;

    // Full screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(quad);

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      shaderMaterial.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight,
        1
      );
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = (time: number) => {
      time *= 0.001;
      shaderMaterial.uniforms.iTime.value = time;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Initialize GSAP ScrollTrigger animations
    const initScrollAnimations = () => {
      // Main scroll progress animation
      gsap.to(shaderMaterial.uniforms.iScrollProgress, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".content",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Merging metaballs animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".content",
            start: "33% top",
            end: "66% bottom",
            scrub: true,
          },
        })
        .to(shaderMaterial.uniforms.iMergeAmount, {
          value: 1,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(shaderMaterial.uniforms.iMergeAmount, {
          value: 0,
          duration: 1,
          ease: "power2.inOut",
        });

      // Color shift animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".content",
            start: "50% top",
            end: "bottom bottom",
            scrub: true,
          },
        })
        .to(shaderMaterial.uniforms.iColorShift, {
          value: 1,
          duration: 1,
          ease: "sine.inOut",
        })
        .to(shaderMaterial.uniforms.iColorShift, {
          value: 0,
          duration: 1,
          ease: "sine.inOut",
        });
    };

    // Start animation and initialize scroll triggers
    animate(0);
    initScrollAnimations();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
    };
  }, []);

  return (
    <div className={` min-h-screen font-rubik text-black overflow-x-hidden`}>
      <style jsx global>{`
        :root {
          --color-background: #ffffff;
          --color-foreground: #1a1a1a;
          --color-accent: #4a85c0;
          --color-neptune: #3971a8;
        }
        body {
          background: radial-gradient(
            circle at 10% 20%,
            #ffffff 0%,
            #f8f9fa 90%
          );
          color: var(--color-foreground);
          letter-spacing: -0.03em;
        }
      `}</style>

      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen z-[1]"
      />

      {/* Fixed Layout Overlay */}

      {/* Scrollable Content */}
      <div
        className="content relative mix-blend-difference z-10"
        style={{ minHeight: "500vh" }}
      >
        {/* Section 1 */}
        <div className="section h-screen flex text-black flex-col justify-center items-center mix-blend-difference relative">
          <div className="flex flex-col gap-4 text-center max-w-lg mx-auto z-[100] mix-blend-difference">
            <h1 className="text-6xl md:text-8xl font-light leading-tight tracking-wide uppercase mix-blend-difference text-white">
              6.AM
              <span className="block text-2xl mt-2 text-white opacity-80">
                Rise Together
              </span>
            </h1>
            <div className="w-1/2 h-px bg-white mx-auto opacity-50 my-4"></div>
            <h2 className="text-base tracking-[0.2em] mt-4 uppercase text-white">
              Run. Repeat. Rise.
            </h2>
            <p className="text-xl max-w-2xl leading-relaxed mt-4 text-white font-light">
              When the world is still asleep, we lace up and hit the pavement.
              For the love of the run, for the strength in community, for the
              sunrise. Join the movement.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="section h-screen flex text-black flex-col justify-center items-center mix-blend-difference relative">
          <div className="flex flex-col gap-4 text-center max-w-lg mx-auto z-[100] mix-blend-difference">
            <h1 className="text-6xl md:text-8xl font-light leading-tight tracking-wide uppercase mix-blend-difference text-white">
              6.AM
              <span className="block text-2xl mt-2 text-white opacity-80">
                Every Step Counts
              </span>
            </h1>
            <div className="w-1/2 h-px bg-white mx-auto opacity-50 my-4"></div>
            <h2 className="text-base tracking-[0.2em] mt-4 uppercase text-white">
              Start Strong
            </h2>
            <p className="text-xl max-w-2xl leading-relaxed mt-4 text-white font-light">
              We run for goals. We run for clarity. We run for each other. No
              matter your pace, you’re already ahead of everyone still in bed.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="section h-screen flex text-black flex-col justify-center items-center mix-blend-difference relative">
          <div className="flex flex-col gap-4 text-center max-w-lg mx-auto z-[100] mix-blend-difference">
            <h1 className="text-6xl md:text-8xl font-light leading-tight tracking-wide uppercase mix-blend-difference text-white">
              6.AM
              <span className="block text-2xl mt-2 text-white opacity-80">
                Find Your Why
              </span>
            </h1>
            <div className="w-1/2 h-px bg-white mx-auto opacity-50 my-4"></div>
            <h2 className="text-base tracking-[0.2em] mt-4 uppercase text-white">
              Purpose in Motion
            </h2>
            <p className="text-xl max-w-2xl leading-relaxed mt-4 text-white font-light">
              We run for that feeling at mile one and mile ten. For the grit.
              For the joy. For the journey we take side by side—before the city
              wakes up.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="section h-screen flex text-black flex-col justify-center items-center mix-blend-difference relative">
          <div className="flex flex-col gap-4 text-center max-w-lg mx-auto z-[100] mix-blend-difference">
            <h1 className="text-6xl md:text-8xl font-light leading-tight tracking-wide uppercase mix-blend-difference text-white">
              6.AM
              <span className="block text-2xl mt-2 text-white opacity-80">
                Chasing Sunrises
              </span>
            </h1>
            <div className="w-1/2 h-px bg-white mx-auto opacity-50 my-4"></div>
            <h2 className="text-base tracking-[0.2em] mt-4 uppercase text-white">
              Run Into the Light
            </h2>
            <p className="text-xl max-w-2xl leading-relaxed mt-4 text-white font-light">
              Some chase finish lines. We chase sunrises. Every morning is a new
              start, a blank slate, and the promise of progress.
            </p>
          </div>
        </div>

        {/* Section 5 */}
        <div className="section h-screen flex text-black flex-col justify-center items-center mix-blend-difference relative">
          <div className="flex flex-col gap-4 text-center max-w-lg mx-auto z-[100] mix-blend-difference">
            <h1 className="text-6xl md:text-8xl font-light leading-tight tracking-wide uppercase mix-blend-difference text-white">
              6.AM
              <span className="block text-2xl mt-2 text-white opacity-80">
                Your New Routine
              </span>
            </h1>
            <div className="w-1/2 h-px bg-white mx-auto opacity-50 my-4"></div>
            <h2 className="text-base tracking-[0.2em] mt-4 uppercase text-white">
              Join the Run
            </h2>
            <p className="text-xl max-w-2xl leading-relaxed mt-4 text-white font-light">
              No matter your distance, no matter your speed, you belong here.
              Tomorrow’s story starts at 6.AM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
