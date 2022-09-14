import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import videojs from "video.js";
import { client } from "../utils";
import "video.js/dist/video-js.css";

const Player = ({ previewUrl }) => {
  const videoRef = useRef(null);

  const dispatch = useDispatch();
  const res = useSelector(
    (state) => state.video.data
  );
  const { VideoId: videoId, PlayURL: src, CoverURL: poster } = res.player;
  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current);
    if (!previewUrl) {
      vjsPlayer.poster(poster);
      vjsPlayer.src(src);
    }
    if (previewUrl) {
      vjsPlayer.src({ type: "video/mp4", src});
    }

    vjsPlayer.on("ended", () => {
      client(`api/v1/videos/${videoId}/view`);
    });
  }, [videoId, dispatch, src, previewUrl, poster]);

  return (
    <div data-vjs-player>
      <video
        controls
        ref={videoRef}
        className="video-js vjs-fluid vjs-big-play-centered"
      ></video>
    </div>
  );
};

export default Player;
