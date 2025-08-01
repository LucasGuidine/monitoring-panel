import { useEffect, useState } from "react";
import { fetchCameras } from "../mockApi/cameraApi";
import { Camera } from "../data/cameras";

export function useCameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCameras = async () => {
    setLoading(true);
    const data = await fetchCameras();
    setCameras(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCameras();
  }, []);

  return { cameras, setCameras, loading };
}
