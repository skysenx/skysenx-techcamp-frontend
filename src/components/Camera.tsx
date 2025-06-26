"use client";

import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Webcam from "react-webcam";
import Button from "./ui/Button";
import { toast } from "sonner";
import useAxiosAuth from "../hooks/auth-hooks/useAxiosAuth";
import { useAttendance } from "../stores/variables";

export interface CameraRef {
  captureImage: () => string | null;
}

const Camera = forwardRef<CameraRef>((_, ref) => {
  const { setStudents } = useAttendance();
  const webcamRef = useRef<Webcam>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>();
  const { post } = useAxiosAuth();

  const [loadingIn, setLoadingIn] = useState(false);
  const [loadingOut, setLoadingOut] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      const videoInputs = mediaDevices.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoInputs);
      if (videoInputs.length > 0) {
        setSelectedDeviceId(videoInputs[0].deviceId);
      }
    });
  }, []);

  const videoConstraints = {
    width: 500,
    height: 400,
    deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
  };

  const capture = () => {
    return webcamRef.current?.getScreenshot() || null;
  };

  const handleMarkAttendance = async (operation: "SIGN_IN" | "SIGN_OUT") => {
    const image = capture();
    if (!image) {
      toast.error("Could not capture image. Please try again.");
      return;
    }

    const setLoading = operation === "SIGN_IN" ? setLoadingIn : setLoadingOut;
    setLoading(true);

    try {
      const res = await fetch(image);
      const blob = await res.blob();
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("operation", operation);
      formData.append("face", file);

      const response = await post(
        "/attendance/sign-in-out/biometrics",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`${operation.replace("_", " ")} successful`);
      setStudents(response.data.data.attendances);
      console.log(response.data.data.attendances);
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    captureImage: () => capture(),
  }));

  return (
    <div className="w-full ">
      {devices.length > 1 && (
        <select
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          className="mb-4 w-full border border-gray-600 px-3 py-2 rounded-lg text-sm"
        >
          {devices.map((device, i) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${i + 1}`}
            </option>
          ))}
        </select>
      )}

      <div className="flex justify-center items-center mb-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-lg"
        />
      </div>

      <div className="flex justify-center gap-4 mt-10">
        {!loadingOut && (
          <Button
            size="lg"
            onClick={() => handleMarkAttendance("SIGN_IN")}
            loading={loadingIn}
            disabled={loadingIn}
          >
            Sign In
          </Button>
        )}

        {!loadingIn && (
          <Button
            size="lg"
            theme="secondary"
            onClick={() => handleMarkAttendance("SIGN_OUT")}
            loading={loadingOut}
            disabled={loadingOut}
          >
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
});

Camera.displayName = "Camera";
export default Camera;
