"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CameraViewer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Unable to access camera");
        console.error(err);
      }
    };

    startCamera();
  }, []);

  return (
    <div>
      {/* <h2 className="mb-4 text-lg font-semibold">Live Camera</h2> */}
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full h-[500px]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
