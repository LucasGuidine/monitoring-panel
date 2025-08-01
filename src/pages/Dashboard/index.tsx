import { useState } from "react";
import AddCameraModal from "../../components/CameraFormModal";
import { Camera } from "../../data/cameras";
import * as Styled from "./styles";
import AlertsList from "../../components/AlertsList";
import { useNavigate } from "react-router-dom";
import { addCamera, deleteCamera, editCamera } from "../../mockApi/cameraApi";
import Loader from "../../components/Loader";
import CameraList from "../../components/CamerasList";
import OccurrenceMap from "../../components/OccurrenceMap";
import AlertsFilterPanel from "../../components/AlertsFilterPanel";
import { useCameras } from "../../hooks/useCameras";
import { useAlerts } from "../../hooks/useAlerts";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [deletingCameraLoading, setDeletingCameraLoading] = useState(false);
  const [addOrUpdateCameraLoading, setAddOrUpdateCameraLoading] =
    useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [selectedAlertType, setSelectedAlertType] = useState<string>("");
  const { cameras, setCameras, loading: camerasLoading } = useCameras();
  const { alerts, loading: alertsLoading } = useAlerts();

  const filteredAlerts = alerts.filter((alert) => {
    const isWithinDateRange =
      (!startDate || new Date(alert.timestamp) >= new Date(startDate)) &&
      (!endDate || new Date(alert.timestamp) <= new Date(endDate));

    const matchesCamera =
      !selectedCameraId || alert.cameraId === selectedCameraId;

    const matchesType = !selectedAlertType || alert.type === selectedAlertType;

    return isWithinDateRange && matchesCamera && matchesType;
  });

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setSelectedCameraId("");
    setSelectedAlertType("");
  };

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

  const handleDeleteCamera = async (id: string) => {
    setDeletingCameraLoading(true);
    await deleteCamera(id);
    setCameras((prev) => prev.filter((camera) => camera.id !== id));
    setDeletingCameraLoading(false);
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
        onSaveCamera={handleAddOrEditCamera}
        cameraToEdit={editingCamera}
        isLoading={addOrUpdateCameraLoading}
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

      {camerasLoading || alertsLoading || deletingCameraLoading ? (
        <Loader />
      ) : (
        <>
          <Styled.Grid>
            <CameraList
              cameras={cameras}
              handleDeleteCamera={handleDeleteCamera}
              handleEditCamera={handleEditCamera}
            />
          </Styled.Grid>

          <Styled.AlertsSection>
            <AlertsFilterPanel
              startDate={startDate}
              endDate={endDate}
              selectedCameraId={selectedCameraId}
              selectedAlertType={selectedAlertType}
              cameras={cameras}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onCameraChange={setSelectedCameraId}
              onTypeChange={setSelectedAlertType}
              onClearFilters={clearFilters}
            />

            <h2>Alertas Recentes</h2>
            <AlertsList cameras={cameras} alerts={filteredAlerts} />
          </Styled.AlertsSection>

          <h2>Mapa de Ccorrências</h2>
          <OccurrenceMap alerts={alerts} cameras={cameras} />
        </>
      )}
    </Styled.Container>
  );
}
