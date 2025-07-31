import { useParams, useNavigate } from "react-router-dom";
import * as Styled from "./styles";
import { ArrowLeft } from "lucide-react";
import { Camera } from "../../data/cameras";
import { Alert } from "../../data/alerts";
import moment from "moment";
import Badge from "../../components/Badge";
import { useEffect, useRef, useState } from "react";
import { getCameraById } from "../../mockApi/cameraApi";
import Loader from "../../components/Loader";
import { fetchAlerts } from "../../mockApi/alertsApi";
import { Stage, Layer, Rect } from "react-konva";

type RectType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function CameraDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [camera, setCamera] = useState<Camera | undefined>(undefined);
  const [listCameraLoading, setListCameraLoading] = useState(false);
  const [listAlertsLoading, setListAlertsLoading] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [rectangles, setRectangles] = useState<RectType[]>([]);
  const [newRect, setNewRect] = useState<RectType | null>(null);
  const isDrawing = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const [isEditMode, setIsEditMode] = useState(false);

  const cameraAlerts = alerts.filter((alert) => alert.cameraId === camera?.id);

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

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setNewRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current || !newRect) return;
    const pos = e.target.getStage().getPointerPosition();
    setNewRect({
      ...newRect,
      width: pos.x - newRect.x,
      height: pos.y - newRect.y,
    });
  };

  const handleMouseUp = () => {
    if (newRect) {
      setRectangles([...rectangles, newRect]);
    }
    setNewRect(null);
    isDrawing.current = false;
  };

  const handleClearDrawings = () => {
    if (!camera?.id) return;

    const saved = localStorage.getItem("camera-drawings");
    const parsed = saved ? JSON.parse(saved) : {};

    delete parsed[camera.id];
    localStorage.setItem("camera-drawings", JSON.stringify(parsed));
    setRectangles([]);
  };

  useEffect(() => {
    const getCamera = async () => {
      setListCameraLoading(true);
      const camera = await getCameraById(id ?? "");
      setCamera(camera);

      const saved = localStorage.getItem("camera-drawings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[camera?.id ?? ""]) {
          setRectangles(parsed[camera?.id ?? ""]);
        }
      }

      setListCameraLoading(false);
    };

    getCamera();
    getAlerts();
  }, [id]);

  useEffect(() => {
    if (!camera?.id) return;

    const saved = localStorage.getItem("camera-drawings");
    const parsed = saved ? JSON.parse(saved) : {};

    parsed[camera.id] = rectangles;

    localStorage.setItem("camera-drawings", JSON.stringify(parsed));
  }, [rectangles, camera]);

  useEffect(() => {
    if (videoRef.current) {
      const updateSize = () => {
        const rect = videoRef.current!.getBoundingClientRect();
        setVideoSize({ width: rect.width, height: rect.height });
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, [videoRef.current]);

  return (
    <Styled.Container>
      <Styled.BackButton onClick={() => navigate("/")}>
        <ArrowLeft size={18} /> Voltar
      </Styled.BackButton>

      {listCameraLoading || listAlertsLoading ? (
        <Loader />
      ) : !camera ? (
        <p>Câmera não encontrada</p>
      ) : (
        <>
          <Styled.Header>
            <h2>{camera.name}</h2>
            <Badge variant={camera.status}>
              {translateCameraStatus(camera.status)}
            </Badge>
          </Styled.Header>

          <Styled.EditButton
            onClick={() => setIsEditMode((prev) => !prev)}
            active={isEditMode}
          >
            {isEditMode ? "Sair do modo de edição" : "Entrar no modo de edição"}
          </Styled.EditButton>

          {rectangles.length > 0 && (
            <Styled.ClearButton onClick={handleClearDrawings}>
              Limpar desenhos
            </Styled.ClearButton>
          )}

          <div ref={containerRef} style={{ position: "relative" }}>
            <Styled.Video ref={videoRef} controls>
              <source src={camera.videoUrl} type="video/mp4" />
              Seu navegador não suporta o vídeo.
            </Styled.Video>

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
            >
              <Stage
                width={videoSize.width}
                height={videoSize.height}
                onMouseDown={isEditMode ? handleMouseDown : undefined}
                onMouseMove={isEditMode ? handleMouseMove : undefined}
                onMouseUp={isEditMode ? handleMouseUp : undefined}
                style={{ pointerEvents: isEditMode ? "auto" : "none" }}
              >
                <Layer>
                  {rectangles.map((rect, i) => (
                    <Rect
                      key={i}
                      {...rect}
                      fill="rgba(255, 0, 0, 0.3)"
                      stroke="red"
                    />
                  ))}
                  {newRect && (
                    <Rect
                      {...newRect}
                      fill="rgba(0, 0, 255, 0.3)"
                      stroke="blue"
                    />
                  )}
                </Layer>
              </Stage>
            </div>
          </div>

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
    </Styled.Container>
  );
}
