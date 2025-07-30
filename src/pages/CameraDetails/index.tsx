import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Styled from "./styles";
import { ArrowLeft } from "lucide-react";
import { Camera } from "../../data/cameras";
import { Alert } from "../../data/alerts";
import moment from "moment";
import Badge from "../../components/Badge";
import { useEffect, useState } from "react";
import { getCameraById } from "../../mockApi/cameraApi";
import Loader from "../../components/Loader";
import { fetchAlerts } from "../../mockApi/alertsApi";

export default function CameraDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [camera, setCamera] = useState<Camera | undefined>(undefined);
  const [listCameraLoading, setListCameraLoading] = useState(false);
  const [listAlertsLoading, setListAlertsLoading] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  function translateCameraStatus(cameraStatus: Camera["status"]) {
    switch (cameraStatus) {
      case "alert":
        return "Alerta";

      case "offline":
        return "Offline";

      case "online":
        return "Online";
    }
  }

  const getAlerts = async () => {
    setListAlertsLoading(true);
    const alerts = await fetchAlerts();
    setAlerts(alerts);
    setListAlertsLoading(false);
  };

  useEffect(() => {
    const getCamera = async () => {
      setListCameraLoading(true);
      const camera = await getCameraById(id ?? "");
      setCamera(camera);
      setListCameraLoading(false);
    };

    getCamera();
    getAlerts();
  }, [id]);

  const cameraAlerts = alerts.filter((alert) => alert.cameraId === camera?.id);

  return (
    <Styled.Container>
      <Styled.BackButton onClick={() => navigate("/")}>
        <ArrowLeft size={18} /> Voltar
      </Styled.BackButton>
      {listCameraLoading || listAlertsLoading ? (
        <Loader />
      ) : (
        <>
          {!camera ? (
            <p>Câmera não encontrada</p>
          ) : (
            <>
              <Styled.Header>
                <h2>{camera.name}</h2>
                <Badge variant={camera.status}>
                  {translateCameraStatus(camera.status)}
                </Badge>
              </Styled.Header>

              <Styled.Video controls>
                <source src={camera.videoUrl} type="video/mp4" />
                Seu navegador não suporta o vídeo.
              </Styled.Video>

              <Styled.Info>
                <p>
                  <strong>Latitude:</strong> {camera.latitude}
                </p>
                <p>
                  <strong>Longitude:</strong> {camera.longitude}
                </p>
              </Styled.Info>

              <Styled.AlertsSection>
                <h3>Alertas relacionados</h3>
                {cameraAlerts.length === 0 ? (
                  <p>Nenhum alerta relacionado a esta câmera.</p>
                ) : (
                  <Styled.AlertsList>
                    {cameraAlerts.map((alert) => (
                      <Styled.AlertCard key={alert.id}>
                        <img src={alert.imageUrl} alt={alert.type} />
                        <div>
                          <strong>{alert.type}</strong>
                          <p>
                            {moment(alert.timestamp).format("DD/MM/YYYY HH:mm")}
                          </p>
                        </div>
                      </Styled.AlertCard>
                    ))}
                  </Styled.AlertsList>
                )}
              </Styled.AlertsSection>
            </>
          )}
        </>
      )}
    </Styled.Container>
  );
}
