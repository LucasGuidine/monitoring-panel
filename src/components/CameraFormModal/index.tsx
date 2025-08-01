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

type FormErrors = {
  name?: string;
  videoUrl?: string;
  latitude?: string;
  longitude?: string;
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

  const [errors, setErrors] = useState<FormErrors>({});

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
    setErrors({});
  }, [cameraToEdit, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nome é obrigatório.";
    }

    if (!form.videoUrl.trim()) {
      newErrors.videoUrl = "URL do vídeo é obrigatória.";
    } else if (!/^https?:\/\/.+/.test(form.videoUrl)) {
      newErrors.videoUrl = "URL inválida.";
    }

    const lat = parseFloat(form.latitude);
    if (!form.latitude.trim()) {
      newErrors.latitude = "Latitude é obrigatória.";
    } else if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.latitude = "Latitude deve estar entre -90 e 90.";
    }

    const lon = parseFloat(form.longitude);
    if (!form.longitude.trim()) {
      newErrors.longitude = "Longitude é obrigatória.";
    } else if (isNaN(lon) || lon < -180 || lon > 180) {
      newErrors.longitude = "Longitude deve estar entre -180 e 180.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

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
                hasError={!!errors.name}
              />
              {errors.name && <Styled.Error>{errors.name}</Styled.Error>}
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>URL do Vídeo</Styled.Label>
              <Styled.Input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleInputChange}
                hasError={!!errors.videoUrl}
              />
              {errors.videoUrl && (
                <Styled.Error>{errors.videoUrl}</Styled.Error>
              )}
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>Latitude</Styled.Label>
              <Styled.Input
                name="latitude"
                value={form.latitude}
                onChange={handleInputChange}
                hasError={!!errors.latitude}
              />
              {errors.latitude && (
                <Styled.Error>{errors.latitude}</Styled.Error>
              )}
            </Styled.Field>

            <Styled.Field>
              <Styled.Label>Longitude</Styled.Label>
              <Styled.Input
                name="longitude"
                value={form.longitude}
                onChange={handleInputChange}
                hasError={!!errors.longitude}
              />
              {errors.longitude && (
                <Styled.Error>{errors.longitude}</Styled.Error>
              )}
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
