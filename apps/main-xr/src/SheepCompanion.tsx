import { useEffect, useState } from "react";
import { Model } from "@webspatial/react-sdk";

type SheepCompanionProps = {
  src: string;
  onActivate?: () => void;
  disabled?: boolean;
  label?: string;
};

export default function SheepCompanion({ src, onActivate, disabled = false, label }: SheepCompanionProps) {
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setLoadError(null);
  }, [src]);

  return (
    <div
      className={`sheep-canvas-shell ${onActivate ? "sheep-canvas-shell--interactive" : ""} ${disabled ? "sheep-canvas-shell--disabled" : ""}`}
      enable-xr={!!onActivate}
      role={onActivate ? "button" : undefined}
      aria-label={label}
      tabIndex={onActivate && !disabled ? 0 : -1}
      onClick={onActivate && !disabled ? onActivate : undefined}
      onKeyDown={
        onActivate && !disabled
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onActivate();
              }
            }
          : undefined
      }
    >
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
