import { useRef, useState } from "react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      setPlaying(false);
      setProgress(0);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const updateProgress = () => {
    if (!audioRef.current) return;

    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;

    setProgress(percent || 0);
  };

  const seekAudio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const value = Number(event.target.value);

    audioRef.current.currentTime =
      (value / 100) * audioRef.current.duration;

    setProgress(value);
  };

  return (
    <div className="player">
      <h1>React Music Player</h1>

      <input type="file" accept="audio/*" onChange={loadFile} />

      {audioURL && (
        <>
          <audio
            ref={audioRef}
            src={audioURL}
            onTimeUpdate={updateProgress}
          />

          <button onClick={togglePlay}>
            {playing ? "Pause" : "Play"}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={seekAudio}
            className="progress"
          />
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
