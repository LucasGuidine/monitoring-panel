import { useState } from 'react';
import AddCameraModal from '../../components/AddCameraModal'
import CameraCard from '../../components/CameraCard'
import { Camera, mockCameras } from '../../data/cameras'
import * as Styled from './styles'

export default function Dashboard() {
    const [cameras, setCameras] = useState<Camera[]>(mockCameras);
    const [showModal, setShowModal] = useState(false);

    const handleAddCamera = (newCamera: Camera) => {
        setCameras((prev) => [...prev, newCamera]);
    };

    return (
        <Styled.Container>
            <Styled.Header>
                <Styled.Title>Grid de Câmeras</Styled.Title>
                <Styled.AddButton onClick={() => setShowModal(true)}>+ Adicionar Câmera</Styled.AddButton>
            </Styled.Header>
            <Styled.Grid>
                {cameras.map((camera) => (
                    <CameraCard key={camera.id} camera={camera} />
                ))}
            </Styled.Grid>

            <AddCameraModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddCamera}
            />
        </Styled.Container>
    )
}