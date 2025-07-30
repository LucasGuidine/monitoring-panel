import { useEffect, useState } from "react";
import { Camera, CameraStatus } from "../../data/cameras";
import * as Styled from "./styles";
import { v4 as uuidv4 } from "uuid";
import Loader from "../Loader";

type CameraFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveCamera: (camera: Camera) => void;
  cameraToEdit?: Camera | null;
  isLoading: boolean;
};

export default function CameraFormModal({
  isOpen,
  onClose,
  onSaveCamera,
  cameraToEdit,
  isLoading,
}: CameraFormModalProps) {
  const [form, setForm] = useState({
    name: "",
    videoUrl: "",
    latitude: "",
    longitude: "",
    status: "online" as CameraStatus,
  });

  useEffect(() => {
    if (cameraToEdit) {
      setForm({
        name: cameraToEdit.name,
        videoUrl: cameraToEdit.videoUrl,
        latitude: cameraToEdit.latitude.toString(),
        longitude: cameraToEdit.longitude.toString(),
        status: cameraToEdit.status,
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
  }, [cameraToEdit, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    const newCamera: Camera = {
      id: cameraToEdit ? cameraToEdit.id : uuidv4(),
      name: form.name,
      videoUrl: form.videoUrl,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      status: form.status,
    };
    onSaveCamera(newCamera);
  };

  if (!isOpen) return null;

  return (
    <Styled.Overlay>
      <Styled.Modal>
        <h3>{cameraToEdit ? "Editar Câmera" : "Adicionar Nova Câmera"}</h3>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Styled.Field>
              <Styled.Label>Nome</Styled.Label>
              <Styled.Input
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>URL do Vídeo</Styled.Label>
              <Styled.Input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleInputChange}
              />
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>Latitude</Styled.Label>
              <Styled.Input
                name="latitude"
                value={form.latitude}
                onChange={handleInputChange}
              />
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>Longitude</Styled.Label>
              <Styled.Input
                name="longitude"
                value={form.longitude}
                onChange={handleInputChange}
              />
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>Status</Styled.Label>
              <Styled.Select
                name="status"
                value={form.status}
                onChange={handleInputChange}
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
              <Styled.Button onClick={handleSave}>Salvar</Styled.Button>
            </Styled.Buttons>
          </>
        )}
      </Styled.Modal>
    </Styled.Overlay>
  );
}
