export type AlertType = "EPI" | "Invasão";

export type Alert = {
  id: string;
  cameraName: string;
  type: AlertType;
  timestamp: string;
  imageUrl: string;
};

export const alerts: Alert[] = [
  {
    id: "1",
    cameraName: "Entrada Principal",
    type: "Invasão",
    timestamp: "2025-07-26T20:30:00",
    imageUrl: "https://placehold.co/300x180?text=Invasao+1",
  },
  {
    id: "2",
    cameraName: "Estoque",
    type: "EPI",
    timestamp: "2025-07-26T20:25:00",
    imageUrl: "https://placehold.co/300x180?text=EPI+1",
  },
  {
    id: "3",
    cameraName: "Saída dos Fundos",
    type: "Invasão",
    timestamp: "2025-07-26T20:15:00",
    imageUrl: "https://placehold.co/300x180?text=Invasao+2",
  },
  {
    id: "4",
    cameraName: "Corredor Leste",
    type: "EPI",
    timestamp: "2025-07-26T20:10:00",
    imageUrl: "https://placehold.co/300x180?text=EPI+2",
  },
  {
    id: "5",
    cameraName: "Portão Traseiro",
    type: "Invasão",
    timestamp: "2025-07-26T20:05:00",
    imageUrl: "https://placehold.co/300x180?text=Invasao+3",
  },
  {
    id: "6",
    cameraName: "Galpão 3",
    type: "EPI",
    timestamp: "2025-07-26T20:00:00",
    imageUrl: "https://placehold.co/300x180?text=EPI+3",
  },
  {
    id: "7",
    cameraName: "Entrada Principal",
    type: "Invasão",
    timestamp: "2025-07-26T19:50:00",
    imageUrl: "https://placehold.co/300x180?text=Invasao+4",
  },
  {
    id: "8",
    cameraName: "Corredor Oeste",
    type: "EPI",
    timestamp: "2025-07-26T19:45:00",
    imageUrl: "https://placehold.co/300x180?text=EPI+4",
  },
];
