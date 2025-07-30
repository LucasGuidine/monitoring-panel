import { AlertCircle, ShieldAlert } from "lucide-react";
import { Alert } from "../../data/alerts";
import Badge from "../Badge";
import * as Styled from "./styles";
import moment from "moment";
import { Camera } from "../../data/cameras";

type AlertsListProps = {
  cameras: Camera[];
  alerts: Alert[];
};

export default function AlertsList({ cameras, alerts }: AlertsListProps) {
  return (
    <Styled.AlertsWrapper>
      {alerts.map((alert: Alert) => (
        <Styled.Container key={alert.id}>
          <Styled.CardImage src={alert.imageUrl} alt={alert.type} />
          <Styled.Content>
            <Styled.CardHeader>
              <Styled.CameraName>
                {cameras.find((camera) => camera.id === alert.cameraId)?.name ??
                  "câmera não encontrada"}
              </Styled.CameraName>
              <Badge
                variant={alert.type === "Invasão" ? "destructive" : "default"}
              >
                {alert.type === "Invasão" ? (
                  <ShieldAlert className="w-4 h-4 mr-1" />
                ) : (
                  <AlertCircle className="w-4 h-4 mr-1" />
                )}
                {alert.type}
              </Badge>
            </Styled.CardHeader>
            <Styled.Timestamp>
              {moment(alert.timestamp)
                .locale("pt-br")
                .format("DD/MM/YYYY HH:mm")}
            </Styled.Timestamp>
          </Styled.Content>
        </Styled.Container>
      ))}
    </Styled.AlertsWrapper>
  );
}
