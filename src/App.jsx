import { useRef, useState } from "react";
import adaVideo from "../public/ada-video.mp4";

export function App() {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    if (!ref.current) return;
    if (nextIsPlaying) {
      const p = ref.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {}); // silencia autoplay
    } else {
      ref.current.pause();
    }
  };

  return (
    <div style={{ display: "grid", gap: 12, placeItems: "start", padding: 16 }}>
      <video
        ref={ref}
        data-testid="video"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        width="480"
      >
        <source src={adaVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button onClick={handleClick}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
