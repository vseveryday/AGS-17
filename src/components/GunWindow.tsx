"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { DirectionalLight, Object3D, PerspectiveCamera, Scene, WebGLRenderer, AmbientLight, Clock } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function GunWindow() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    setLoading(true);

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current as HTMLCanvasElement,
      antialias: true,
      alpha: true,
    });

    const camera = new PerspectiveCamera(
      45, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      1000 // far
    );

    camera.position.set(0, 0, 7);

    const scene = new Scene();

    // lights
    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    directionalLight.castShadow = true;
    directionalLight.position.set(-1, 2, 4);
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    //fbx model
    const container = new Object3D();
    container.position.set(0, 0, 0);

    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      "/AGS-17.fbx",
      (object) => {
        object.scale.set(0.05, 0.05, 0.05);
        object.position.set(1, 0.7, 0);
        container.add(object);
      },
      (xhr) => {
        setLoaded((xhr.loaded / xhr.total) * 100);
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
    scene.add(container);

    renderer.setAnimationLoop(() => {
      // console.log();
      container.rotation.y -= 0.005;

      renderer.render(scene, camera);
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize, false);

    new OrbitControls(camera, renderer.domElement);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <>
      {loaded !== 100 && <ProgressBar animated now={loaded} label={`${loaded.toLocaleString()}%`} style={{ width: "100%" }} />}
      <canvas style={{ width: "100%", height: "100%", display: "block", background: "url('/background.jpg')" }} ref={canvasRef} />
    </>
  );
}
