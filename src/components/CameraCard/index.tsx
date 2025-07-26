import { Camera } from '../../data/cameras';
import * as Styled from './styles'

type CameraCardProps = {
    camera: Camera;
}

export default function CameraCard({ camera }: CameraCardProps) {
    const statusColor = {
        online: 'green',
        offline: 'red',
        alert: 'orange',
    }[camera.status];

    return (
        <Styled.Card>
            <Styled.VideoWrapper>
                <Styled.StyledVideo src={camera.videoUrl} autoPlay muted loop />
                <Styled.StatusDot color={statusColor} />
            </Styled.VideoWrapper>
            <Styled.Info>
                <strong>{camera.name}</strong>
            </Styled.Info>
        </Styled.Card>
    )
}