import { Camera, mockCameras } from "../data/cameras";

const CAMERA_STORAGE_KEY = "mocked_cameras";

const delay = () => {
  const randomMs = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  return new Promise((res) => setTimeout(res, randomMs));
};

function getStoredCameras(): Camera[] {
  const raw = localStorage.getItem(CAMERA_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function setStoredCameras(cameras: Camera[]) {
  localStorage.setItem(CAMERA_STORAGE_KEY, JSON.stringify(cameras));
}

function initializeStorage() {
  const raw = localStorage.getItem(CAMERA_STORAGE_KEY);
  if (!raw) {
    setStoredCameras(mockCameras);
  }
}

initializeStorage();

export async function fetchCameras(): Promise<Camera[]> {
  await delay();
  return getStoredCameras();
}

export async function getCameraById(id: string): Promise<Camera | undefined> {
  await delay();
  return getStoredCameras().find((c) => c.id === id);
}

export async function addCamera(camera: Camera): Promise<Camera> {
  await delay();
  const updated = [...getStoredCameras(), camera];
  setStoredCameras(updated);
  return camera;
}

export async function deleteCamera(id: string): Promise<void> {
  await delay();
  const updated = getStoredCameras().filter((c) => c.id !== id);
  setStoredCameras(updated);
}

export async function editCamera(updatedCamera: Camera): Promise<Camera> {
  await delay();
  const updated = getStoredCameras().map((camera) =>
    camera.id === updatedCamera.id ? updatedCamera : camera
  );
  setStoredCameras(updated);
  return updatedCamera;
}
