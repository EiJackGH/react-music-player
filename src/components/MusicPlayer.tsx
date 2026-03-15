import { useRef, useState } from "react";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      setPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !audioURL) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <div className="player">
      <h1>React Music Player</h1>

      <input type="file" accept="audio/*" onChange={loadFile} />

      {audioURL && (
        <>
          <audio ref={audioRef} src={audioURL} />

          <button onClick={togglePlay}>
            {playing ? "Pause" : "Play"}
          </button>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
