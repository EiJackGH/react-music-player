import React from "react";
import "./Playlist.css";

interface Song {
  name: string;
  url: string;
}

interface PlaylistProps {
  songs: Song[];
  currentIndex: number | null;
  onSelect: (index: number) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ songs, currentIndex, onSelect }) => {
  if (songs.length === 0) {
    return <p className="playlist-empty">No songs loaded</p>;
  }

  return (
    <div className="playlist-container">
      <h2>Playlist</h2>

      <ul className="playlist">
        {songs.map((song, index) => (
          <li
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => onSelect(index)}
          >
            {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
