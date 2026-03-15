import SheepCompanion from "./SheepCompanion";

const SHEEP_MODEL_SRC = "/Meshy_AI_model_Animation_Walking_withSkin.glb";

export default function SheepPage() {
  return (
    <div className="sheep-page-root">
      <div className="sheep-window" enable-xr>
        <div className="sheep-companion-label">Walking Companion</div>
        <SheepCompanion src={SHEEP_MODEL_SRC} />
      </div>
    </div>
  );
}
