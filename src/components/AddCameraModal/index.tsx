import { useEffect, useState } from "react";
import { Camera, CameraStatus } from "../../data/cameras";
import * as Styled from "./styles";
import { v4 as uuidv4 } from "uuid";
import Loader from "../Loader";

type AddCameraModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (camera: Camera) => void;
  editingCamera?: Camera | null;
  loading: boolean;
};

export default function AddCameraModal({
  isOpen,
  onClose,
  onSubmit,
  editingCamera,
  loading,
}: AddCameraModalProps) {
  const [form, setForm] = useState({
    name: "",
    videoUrl: "",
    latitude: "",
    longitude: "",
    status: "online" as CameraStatus,
  });

  useEffect(() => {
    if (editingCamera) {
      setForm({
        name: editingCamera.name,
        videoUrl: editingCamera.videoUrl,
        latitude: editingCamera.latitude.toString(),
        longitude: editingCamera.longitude.toString(),
        status: editingCamera.status,
      });
    } else {
      setForm({
        name: "",
        videoUrl: "",
        latitude: "",
        longitude: "",
        status: "online",
      });
    }
  }, [editingCamera, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const newCamera: Camera = {
      id: editingCamera ? editingCamera.id : uuidv4(),
      name: form.name,
      videoUrl: form.videoUrl,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      status: form.status,
    };
    onSubmit(newCamera);
  };

  if (!isOpen) return null;

  return (
    <Styled.Overlay>
      <Styled.Modal>
        <h3>{editingCamera ? "Editar Câmera" : "Adicionar Nova Câmera"}</h3>

        {loading ? (
          <Loader />
        ) : (
          <>
            <Styled.Field>
              <Styled.Label>Nome</Styled.Label>
              <Styled.Input
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>URL do Vídeo</Styled.Label>
              <Styled.Input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
              />
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>Latitude</Styled.Label>
              <Styled.Input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
              />
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>Longitude</Styled.Label>
              <Styled.Input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
              />
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>Status</Styled.Label>
              <Styled.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="alert">Alerta</option>
              </Styled.Select>
            </Styled.Field>

            <Styled.Buttons>
              <Styled.CancelButton onClick={onClose}>
                Cancelar
              </Styled.CancelButton>
              <Styled.Button onClick={handleSubmit}>Salvar</Styled.Button>
            </Styled.Buttons>
          </>
        )}
      </Styled.Modal>
    </Styled.Overlay>
  );
}
