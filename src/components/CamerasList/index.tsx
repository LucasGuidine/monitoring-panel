import { useNavigate } from "react-router-dom";
import { Camera } from "../../data/cameras";
import CameraCard from "../CameraCard";

type CameraListProps = {
  cameras: Camera[];
  handleEditCamera: (camera: Camera) => void;
  handleDeleteCamera: (id: string) => void;
};

export default function CameraList({
  cameras,
  handleEditCamera,
  handleDeleteCamera,
}: CameraListProps) {
  const navigate = useNavigate();

  return (
    <>
      {cameras.map((camera) => (
        <CameraCard
          key={camera.id}
          camera={camera}
          onEdit={handleEditCamera}
          onDelete={handleDeleteCamera}
          onClick={() => navigate(`/camera/${camera.id}`)}
        />
      ))}
    </>
  );
}
