import SheepCompanion from "./SheepCompanion";

const SHEEP_MODEL_SRC = "/Meshy_AI_model_Animation_Walking_withSkin.glb";

export default function CompanionPage() {
  return (
    <div className="companion-page-root">
      <div className="companion-volume">
        <div className="companion-title-wrap">
          <p className="companion-eyebrow">Volume Scene</p>
          <h2 className="companion-title">Walking Companion</h2>
        </div>
        <SheepCompanion src={SHEEP_MODEL_SRC} />
      </div>
    </div>
  );
}
