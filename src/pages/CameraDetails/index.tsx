import { useParams } from "react-router-dom";

export default function CameraDetails() {
  const { id } = useParams();
  return <h1>Detalhes da Câmera: {id}</h1>;
}
