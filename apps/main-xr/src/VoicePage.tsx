import { useEffect } from "react";
import { initScene } from "@webspatial/react-sdk";
import { isXRMode } from "./xrMode";
type SceneDefinition = {
  windowName: string;
  path: string;
  title: string;
  description: string;
  defaultSize: {
    width: number | string;
    height: number | string;
    depth?: string;
  };
  sceneType?: "volume";
};

const SCENES: SceneDefinition[] = [
  {
    windowName: "kinship-companion",
    path: "/companion",
    title: "Walking Companion",
    description: "Voice companion scene with the animated sheep guide.",
    defaultSize: {
      width: "0.56m",
      height: "0.72m",
      depth: "0.56m",
    },
    sceneType: "volume",
  },
  {
    windowName: "monument-valley-scene",
    path: "/monument-valley",
    title: "Monument Valley",
    description: "3D Monument Valley scene in its own spatial volume.",
    defaultSize: {
      width: "0.9m",
      height: "0.72m",
      depth: "0.9m",
    },
    sceneType: "volume",
  },
  {
    windowName: "windtalkers-trailer-scene",
    path: "/trailer",
    title: "Windtalkers Trailer",
    description: "Standalone trailer scene for the Windtalkers video.",
    defaultSize: {
      width: 960,
      height: 640,
    },
  },
  {
    windowName: "amazon-books-scene",
    path: "/books",
    title: "Amazon Books",
    description: "Standalone Amazon browsing scene for Monument Valley books.",
    defaultSize: {
      width: 720,
      height: 900,
    },
  },
];

let hasOpenedXRScenes = false;

export default function VoicePage() {
  useEffect(() => {
    if (!isXRMode || hasOpenedXRScenes) return;

    hasOpenedXRScenes = true;

    for (const scene of SCENES) {
      initScene(
        scene.windowName,
        (cfg) => ({
          ...cfg,
          defaultSize: scene.defaultSize,
        }),
        scene.sceneType ? { type: scene.sceneType } : undefined,
      );
      window.open(scene.path, scene.windowName);
    }
  }, []);
  return (
    <div className={`launcher-page-root ${isXRMode ? "launcher-page-root--xr" : ""}`}>
      <div className="launcher-content">
        <div className="launcher-copy">
          <p className="launcher-kicker">Spatial Launcher</p>
          <h1 className="launcher-title">Kinship Scenes</h1>
          <p className="launcher-subtitle">
            {isXRMode
              ? "Opening the Windtalkers trailer, Amazon books, and companion scenes as separate spatial experiences."
              : "Open each experience below. In XR, these launch as separate scenes."}
          </p>
        </div>

        <div className="launcher-scene-grid">
          {SCENES.map((scene) => (
            <a key={scene.path} className="launcher-scene-card" href={scene.path}>
              <p className="launcher-scene-label">Scene</p>
              <h2 className="launcher-scene-title">{scene.title}</h2>
              <p className="launcher-scene-description">{scene.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
