import { AlertCircle, ShieldAlert } from "lucide-react";
import { Alert, alerts } from "../../data/alerts";
import Badge from "../Badge";
import * as Styled from "./styles";
import moment from "moment";
import { mockCameras } from "../../data/cameras";

export default function AlertsList() {
  return (
    <Styled.AlertsWrapper>
      {alerts.map((alert: Alert) => (
        <Styled.Container key={alert.id}>
          <Styled.CardImage src={alert.imageUrl} alt={alert.type} />
          <Styled.Content>
            <Styled.CardHeader>
              <Styled.CameraName>
                {
                  mockCameras.find((camera) => camera.id === alert.cameraId)
                    ?.name
                }
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
