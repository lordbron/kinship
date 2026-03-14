const TRAILER_SRC = "/windtalkers_trailer.mp4";

export default function TrailerPage() {
  return (
    <div className="trailer-page-root">
      <div className="trailer-window" enable-xr>
        <div className="trailer-header">
          <h2 className="trailer-title">Windtalkers Trailer</h2>
        </div>

        <div className="trailer-player-shell" enable-xr-monitor>
          <video
            className="trailer-video"
            src={TRAILER_SRC}
            controls
            playsInline
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
