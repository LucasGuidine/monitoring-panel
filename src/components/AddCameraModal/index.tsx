import { useState } from 'react';
import { Camera, CameraStatus } from '../../data/cameras';
import * as Styled from './styles'
import { v4 as uuidv4 } from 'uuid';

type AddCameraModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (camera: Camera) => void;
}

export default function AddCameraModal({ isOpen, onClose, onSubmit }: AddCameraModalProps) {
    const [form, setForm] = useState({
        name: '',
        videoUrl: '',
        latitude: '',
        longitude: '',
        status: 'online' as CameraStatus,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        const newCamera: Camera = {
            id: uuidv4(),
            name: form.name,
            videoUrl: form.videoUrl,
            latitude: parseFloat(form.latitude),
            longitude: parseFloat(form.longitude),
            status: form.status,
        };
        onSubmit(newCamera);
        onClose();
        setForm({ name: '', videoUrl: '', latitude: '', longitude: '', status: 'online' });
    };

    if (!isOpen) return null;

    return (
        <Styled.Overlay>
            <Styled.Modal>
                <h3>Adicionar Nova Câmera</h3>

                <Styled.Field>
                    <Styled.Label>Nome</Styled.Label>
                    <Styled.Input name="name" value={form.name} onChange={handleChange} />
                </Styled.Field>

                <Styled.Field>
                    <Styled.Label>URL do Vídeo</Styled.Label>
                    <Styled.Input name="videoUrl" value={form.videoUrl} onChange={handleChange} />
                </Styled.Field>

                <Styled.Field>
                    <Styled.Label>Latitude</Styled.Label>
                    <Styled.Input name="latitude" value={form.latitude} onChange={handleChange} />
                </Styled.Field>

                <Styled.Field>
                    <Styled.Label>Longitude</Styled.Label>
                    <Styled.Input name="longitude" value={form.longitude} onChange={handleChange} />
                </Styled.Field>

                <Styled.Field>
                    <Styled.Label>Status</Styled.Label>
                    <Styled.Select name="status" value={form.status} onChange={handleChange}>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="alert">Alerta</option>
                    </Styled.Select>
                </Styled.Field>

                <Styled.Buttons>
                    <Styled.CancelButton onClick={onClose}>Cancelar</Styled.CancelButton>
                    <Styled.Button onClick={handleSubmit}>Salvar</Styled.Button>
                </Styled.Buttons>
            </Styled.Modal>
        </Styled.Overlay>
    )
}