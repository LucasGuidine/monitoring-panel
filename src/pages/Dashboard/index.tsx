import { useState } from "react";
import AddCameraModal from "../../components/AddCameraModal";
import CameraCard from "../../components/CameraCard";
import { Camera, mockCameras } from "../../data/cameras";
import * as Styled from "./styles";
import AlertsList from "../../components/AlertsList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [cameras, setCameras] = useState<Camera[]>(mockCameras);
  const [showModal, setShowModal] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const navigate = useNavigate();

  const handleAddOrEditCamera = (camera: Camera) => {
    if (editingCamera) {
      setCameras((prev) => prev.map((c) => (c.id === camera.id ? camera : c)));
      setEditingCamera(null);
    } else {
      setCameras((prev) => [...prev, camera]);
    }
    setShowModal(false);
  };

  const handleDeleteCamera = (id: string) => {
    setCameras((prev) => prev.filter((camera) => camera.id !== id));
  };

  const handleEditCamera = (camera: Camera) => {
    setEditingCamera(camera);
    setShowModal(true);
  };

  return (
    <Styled.Container>
      <AddCameraModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrEditCamera}
        editingCamera={editingCamera}
      />

      <Styled.Title>Grid de Câmeras</Styled.Title>

      <Styled.Header>
        <Styled.AddButton
          onClick={() => {
            setEditingCamera(null);
            setShowModal(true);
          }}
        >
          + Adicionar Câmera
        </Styled.AddButton>

        <Styled.AnalyticsButton onClick={() => navigate("/analytics")}>
          Ver Estatísticas
        </Styled.AnalyticsButton>
      </Styled.Header>

      <Styled.Grid>
        {cameras.map((camera) => (
          <CameraCard
            key={camera.id}
            camera={camera}
            onEdit={handleEditCamera}
            onDelete={handleDeleteCamera}
          />
        ))}
      </Styled.Grid>

      <Styled.AlertsSection>
        <h2>Alertas Recentes</h2>
        <AlertsList />
      </Styled.AlertsSection>
    </Styled.Container>
  );
}
