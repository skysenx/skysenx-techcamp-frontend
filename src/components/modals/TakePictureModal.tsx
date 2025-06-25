/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTakePicModal } from "../../stores/modals";
import { TfiClose } from "react-icons/tfi";
import Webcam from "react-webcam";
import Button from "../ui/Button";
import { toast } from "sonner";
import useAxiosAuth from "../../hooks/auth-hooks/useAxiosAuth";

const TakePictureModal = ({ reg }: { reg: string }) => {
  const { isModalOpen, closeModal } = useTakePicModal();
  const { post } = useAxiosAuth();
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(
    undefined
  );

  // Fetch camera devices when modal opens
  useEffect(() => {
    if (isModalOpen) {
      navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
        const videoInputs = mediaDevices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoInputs);
        if (videoInputs.length > 0) {
          setSelectedDeviceId(videoInputs[0].deviceId); // default to first
        }
      });
    }
  }, [isModalOpen]);

  const videoConstraints = {
    width: 400,
    height: 300,
    deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
  };

  const capture = () => {
    const imgSrc = webcamRef.current?.getScreenshot();
    setImage(imgSrc || null);
  };

  const handleRetake = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const res = await fetch(image);
      const blob = await res.blob();
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("regNo", reg);
      formData.append("face", file);

      const response = await post("/student/enroll/biometrics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      toast.success("Photo uploaded successfully");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Photo upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => {
        closeModal();
        handleRetake();
      }}
    >
      <div className="fixed inset-0 z-10 w-screen pt-20 pb-40 overflow-y-auto bg-[#00000021]">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-[600px] rounded-xl bg-white p-[34px] backdrop-blur-2xl relative"
            style={{ boxShadow: " -1px 6px 12.5px 0px #00000021" }}
          >
            <div className="flex justify-between items-center mb-4">
              <DialogTitle as="h3" className="text-base font-medium">
                Take a Picture
              </DialogTitle>
              <button
                className="cursor-pointer bg-white border border-[#EFEFEF] absolute -top-8 -right-8 h-16 w-16 rounded-full flex justify-center items-center"
                onClick={() => {
                  closeModal();
                  handleRetake();
                }}
              >
                <TfiClose className="text-[26px]" />
              </button>
            </div>

            {devices.length > 1 && (
              <div className="mb-4">
                <label className="label-class">Select Camera:</label>
                <select
                  value={selectedDeviceId}
                  onChange={(e) => setSelectedDeviceId(e.target.value)}
                  className="w-full    border border-gray-600 focus:outline-none px-3 py-2 rounded-lg text-sm"
                >
                  {devices.map((device, index) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Camera ${index + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-center items-center mb-4">
              {!image ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="rounded-lg"
                />
              ) : (
                <img src={image} alt="Captured" className="rounded-lg w-full" />
              )}
            </div>

            <div className="flex justify-center gap-4">
              {!image ? (
                <Button onClick={capture} size="sm">
                  Capture
                </Button>
              ) : (
                <>
                  <Button onClick={handleRetake} size="sm" theme="secondary">
                    Retake
                  </Button>
                  <Button loading={loading} onClick={handleSubmit} size="sm">
                    Submit
                  </Button>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TakePictureModal;
