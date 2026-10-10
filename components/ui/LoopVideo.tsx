"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

type Props = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "loop"> & {
  /** Second to start (and loop back to), skipping blank page-load frames. */
  start?: number;
};

/** Muted video that always plays from `start` and loops back to it instead of 0. */
const LoopVideo = forwardRef<HTMLVideoElement, Props>(function LoopVideo({ start = 0, ...rest }, ref) {
  const el = useRef<HTMLVideoElement>(null);
  useImperativeHandle(ref, () => el.current!);

  return (
    <video
      ref={el}
      muted
      playsInline
      {...rest}
      onLoadedMetadata={(e) => {
        if (e.currentTarget.currentTime < start) e.currentTarget.currentTime = start;
        rest.onLoadedMetadata?.(e);
      }}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (v.currentTime < start - 0.05) v.currentTime = start;
      }}
      onEnded={(e) => {
        const v = e.currentTarget;
        v.currentTime = start;
        v.play().catch(() => {});
      }}
    />
  );
});

export default LoopVideo;
