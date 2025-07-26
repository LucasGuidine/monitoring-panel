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
];
