import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Tooltip, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { Camera } from "../../data/cameras";
import { Alert } from "../../data/alerts";
import * as Styled from "./styles";

type OccurrenceMapProps = {
  cameras: Camera[];
  alerts: Alert[];
};

const AlertMarker = ({
  camera,
  alertCount,
}: {
  camera: Camera;
  alertCount: number;
}) => {
  const color = alertCount >= 5 ? "red" : alertCount >= 3 ? "orange" : "blue";

  const icon = L.divIcon({
    html: `<div style="
        background-color: ${color};
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">${alertCount}</div>`,
    className: "",
    iconSize: [30, 30],
  });

  return (
    <MarkerClusterGroup>
      <Marker
        key={camera.id}
        position={[camera.latitude, camera.longitude]}
        icon={icon}
      >
        <Tooltip direction="top" offset={[0, -15]} opacity={1} permanent>
          {camera.name}
        </Tooltip>
      </Marker>
    </MarkerClusterGroup>
  );
};

export default function OccurrenceMap({ cameras, alerts }: OccurrenceMapProps) {
  const alertCountByCamera: Record<string, number> = {};
  alerts.forEach((alert) => {
    alertCountByCamera[alert.cameraId] =
      (alertCountByCamera[alert.cameraId] || 0) + 1;
  });

  return (
    <Styled.MapWrapper>
      <MapContainer
        center={[-23.5505, -46.6333]}
        zoom={15}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup>
          {cameras.map((camera) => (
            <AlertMarker
              key={camera.id}
              camera={camera}
              alertCount={alertCountByCamera[camera.id] || 0}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Styled.MapWrapper>
  );
}
