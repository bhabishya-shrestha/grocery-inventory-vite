import React, { useEffect, useRef, useState } from "react";
import { MdCameraAlt, MdCameraswitch, MdClose } from "react-icons/md";

interface BarcodeScannerProps {
  onScan?: (code: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCamera, setCurrentCamera] = useState(0);

  // Mock function to simulate barcode detection
  useEffect(() => {
    if (isScanning && onScan) {
      // Simulating a barcode detection after 5 seconds
      const timer = setTimeout(() => {
        onScan("123456789");
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, onScan, onClose]);

  useEffect(() => {
    // Get available cameras
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setCameras(videoDevices);
        if (videoDevices.length > 0) {
          startCamera(videoDevices[0].deviceId);
        }
      })
      .catch((err) => console.error("Error accessing cameras:", err));

    const currentVideoRef = videoRef.current;
    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        const tracks = (currentVideoRef.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async (deviceId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: deviceId },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);
    } catch (err) {
      console.error("Error starting camera:", err);
    }
  };

  const switchCamera = () => {
    const nextCamera = (currentCamera + 1) % cameras.length;
    setCurrentCamera(nextCamera);
    startCamera(cameras[nextCamera].deviceId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Scan Barcode</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {!isScanning && (
              <button
                onClick={() => setIsScanning(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MdCameraAlt className="w-5 h-5 mr-2 inline-block" />
                Start Scanning
              </button>
            )}
          </div>
        </div>

        {cameras.length > 1 && (
          <button
            onClick={switchCamera}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <MdCameraswitch className="w-5 h-5 mr-2 inline-block" />
            Switch Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;
