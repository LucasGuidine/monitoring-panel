import { Camera } from "../../data/cameras";
import * as Styled from "./styles";

type CameraCardProps = {
  camera: Camera;
  onEdit: (camera: Camera) => void;
  onDelete: (id: string) => void;
  onClick?: () => void;
};

export default function CameraCard({
  camera,
  onEdit,
  onDelete,
  onClick,
}: CameraCardProps) {
  const statusColor = {
    online: "green",
    offline: "red",
    alert: "orange",
  }[camera.status];

  return (
    <Styled.Card>
      <Styled.VideoWrapper>
        <Styled.StyledVideo
          src={camera.videoUrl}
          autoPlay
          muted
          loop
          onClick={onClick}
        />
        <Styled.StatusDot color={statusColor} />
      </Styled.VideoWrapper>
      <Styled.Info>
        <strong>{camera.name}</strong>
        <Styled.Actions>
          <Styled.Button onClick={() => onEdit(camera)}>Editar</Styled.Button>
          <Styled.Button danger onClick={() => onDelete(camera.id)}>
            Remover
          </Styled.Button>
        </Styled.Actions>
      </Styled.Info>
    </Styled.Card>
  );
}
