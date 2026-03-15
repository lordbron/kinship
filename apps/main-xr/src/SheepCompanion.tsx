import { useEffect, useState } from "react";
import { Model } from "@webspatial/react-sdk";

type SheepCompanionProps = {
  src: string;
};

export default function SheepCompanion({ src }: SheepCompanionProps) {
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setLoadError(null);
  }, [src]);

  return (
    <div className="sheep-canvas-shell">
      <Model
        enable-xr
        src={src}
        className="sheep-model"
        onLoad={() => setLoadError(null)}
        onError={() => setLoadError("3D model failed to load")}
      />
      {loadError && <p className="sheep-error-text">{loadError}</p>}
    </div>
  );
}
