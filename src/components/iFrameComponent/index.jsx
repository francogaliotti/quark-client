import React from "react";
import { LoadingModal } from "../loadingModal";

export const IFrameComponent = ({ url }) => {
  const src = (process.env.REACT_APP_MOODLE_URL) + url;

  return (
    <div
      className="iFrameContainer"
      style={{ position: "relative", height: "100%", overflow: "hidden" }}
    >
      <LoadingModal />
      <iframe
        id="inlineFrameExample"
        style={{ position: "absolute", top: "0" }}
        title="cookieFrame"
        width="100%"
        height="100%"
        src={src}
        name="cookieFrame"
      ></iframe>
    </div>
  );
};
