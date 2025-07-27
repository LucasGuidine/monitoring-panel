import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Styled from "./styles";
import { ArrowLeft } from "lucide-react";
import { Camera, mockCameras } from "../../data/cameras";
import { alerts } from "../../data/alerts";
import moment from "moment";
import Badge from "../../components/Badge";

export default function CameraDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const camera = mockCameras.find((c) => c.id === id);
  const cameraAlerts = alerts.filter((alert) => alert.cameraId === camera?.id);

  if (!camera) return <p>Câmera não encontrada</p>;

  return (
    <Styled.Container>
      <Styled.BackButton onClick={() => navigate("/")}>
        <ArrowLeft size={18} /> Voltar
      </Styled.BackButton>

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
                  <p>{moment(alert.timestamp).format("DD/MM/YYYY HH:mm")}</p>
                </div>
              </Styled.AlertCard>
            ))}
          </Styled.AlertsList>
        )}
      </Styled.AlertsSection>
    </Styled.Container>
  );
}
