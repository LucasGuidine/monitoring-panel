import { useEffect, useState } from "react";
import AddCameraModal from "../../components/CameraFormModal";
import { Camera } from "../../data/cameras";
import * as Styled from "./styles";
import AlertsList from "../../components/AlertsList";
import { useNavigate } from "react-router-dom";
import {
  addCamera,
  deleteCamera,
  editCamera,
  fetchCameras,
} from "../../mockApi/cameraApi";
import Loader from "../../components/Loader";
import { Alert } from "../../data/alerts";
import { fetchAlerts } from "../../mockApi/alertsApi";
import CameraList from "../../components/CamerasList";
import OccurrenceMap from "../../components/OccurrenceMap";

export default function Dashboard() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [listCamerasLoading, setListCamerasLoading] = useState(false);
  const [listAlertsLoading, setListAlertsLoading] = useState(false);
  const [deletingCameraLoading, setDeletingCameraLoading] = useState(false);
  const [addOrUpdateCameraLoading, setAddOrUpdateCameraLoading] =
    useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [selectedAlertType, setSelectedAlertType] = useState<string>("");

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

      {listCamerasLoading || listAlertsLoading || deletingCameraLoading ? (
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
            <Styled.FiltersWrapper>
              <label>
                Início:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>

              <label>
                Fim:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>

              <label>
                Câmera:
                <select
                  value={selectedCameraId}
                  onChange={(e) => setSelectedCameraId(e.target.value)}
                >
                  <option value="">Todas</option>
                  {cameras.map((camera) => (
                    <option key={camera.id} value={camera.id}>
                      {camera.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Tipo:
                <select
                  value={selectedAlertType}
                  onChange={(e) => setSelectedAlertType(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Invasão">Invasão</option>
                  <option value="EPI">EPI</option>
                </select>
              </label>

              <Styled.ClearButton onClick={clearFilters}>
                Limpar Filtros
              </Styled.ClearButton>
            </Styled.FiltersWrapper>

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
