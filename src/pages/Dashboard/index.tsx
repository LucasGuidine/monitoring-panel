import { useEffect, useState } from "react";
import AddCameraModal from "../../components/AddCameraModal";
import CameraCard from "../../components/CameraCard";
import { Camera } from "../../data/cameras";
import * as Styled from "./styles";
import AlertsList from "../../components/AlertsList";
import { useNavigate } from "react-router-dom";
import { addCamera, editCamera, fetchCameras } from "../../mockApi/cameraApi";
import Loader from "../../components/Loader";
import { Alert } from "../../data/alerts";
import { fetchAlerts } from "../../mockApi/alertsApi";

export default function Dashboard() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [listCamerasLoading, setListCamerasLoading] = useState(false);
  const [listAlertsLoading, setListAlertsLoading] = useState(false);
  const [addOrUpdateCameraLoading, setAddOrUpdateCameraLoading] =
    useState(false);
  const navigate = useNavigate();

  const handleAddOrEditCamera = async (camera: Camera) => {
    setAddOrUpdateCameraLoading(true);
    if (editingCamera) {
      const updatedCamera = await editCamera(camera);
      setCameras((prev) =>
        prev.map((camera) =>
          camera.id === updatedCamera.id ? updatedCamera : camera
        )
      );
      setEditingCamera(null);
    } else {
      const newCamera = await addCamera(camera);
      setCameras((prev) => [...prev, newCamera]);
    }
    setAddOrUpdateCameraLoading(false);
    setShowModal(false);
  };

  const handleDeleteCamera = (id: string) => {
    setCameras((prev) => prev.filter((camera) => camera.id !== id));
  };

  const handleEditCamera = (camera: Camera) => {
    setEditingCamera(camera);
    setShowModal(true);
  };

  const getCameras = async () => {
    setListCamerasLoading(true);
    const cameras = await fetchCameras();
    setCameras(cameras);
    setListCamerasLoading(false);
  };

  const getAlerts = async () => {
    setListAlertsLoading(true);
    const alerts = await fetchAlerts();
    setAlerts(alerts);
    setListAlertsLoading(false);
  };

  useEffect(() => {
    getCameras();
    getAlerts();
  }, []);

  return (
    <Styled.Container>
      <AddCameraModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddOrEditCamera}
        editingCamera={editingCamera}
        loading={addOrUpdateCameraLoading}
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

      {listCamerasLoading || listAlertsLoading ? (
        <Loader />
      ) : (
        <>
          <Styled.Grid>
            {cameras.map((camera) => (
              <CameraCard
                key={camera.id}
                camera={camera}
                onEdit={handleEditCamera}
                onDelete={handleDeleteCamera}
                onClick={() => navigate(`/camera/${camera.id}`)}
              />
            ))}
          </Styled.Grid>

          <Styled.AlertsSection>
            <h2>Alertas Recentes</h2>
            <AlertsList cameras={cameras} alerts={alerts} />
          </Styled.AlertsSection>
        </>
      )}
    </Styled.Container>
  );
}
