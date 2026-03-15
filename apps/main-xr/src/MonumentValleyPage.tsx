import SheepCompanion from "./SheepCompanion";

const MONUMENT_VALLEY_MODEL_SRC = "/monumentvalley.glb";

export default function MonumentValleyPage() {
  return (
    <div className="monument-page-root">
      <div className="monument-volume">
        <div className="companion-title-wrap">
          <p className="companion-eyebrow">Volume Scene</p>
          <h2 className="companion-title">Monument Valley</h2>
        </div>
        <SheepCompanion src={MONUMENT_VALLEY_MODEL_SRC} />
      </div>
    </div>
  );
}
