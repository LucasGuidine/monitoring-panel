export type AlertType = "EPI" | "Invasão";

export type Alert = {
  id: string;
  cameraId: string;
  type: AlertType;
  timestamp: string;
  imageUrl: string;
};

export const alerts: Alert[] = [
  {
    id: "1",
    cameraId: "1",
    type: "Invasão",
    timestamp: "2025-07-26T20:30:00",
    imageUrl: "https://placehold.co/300x180?text=Invasao+1",
  },
  {
    id: "2",
    cameraId: "2",
    type: "EPI",
    timestamp: "2025-07-26T20:25:00",
    imageUrl: "https://placehold.co/300x180?text=EPI+1",
  },
  {
    id: "3",
    cameraId: "3",
    type: "Invasão",
    timestamp: "2025-07-28T20:15:00",
    imageUrl: "https://placehold.co/300x180?text=Invasao+2",
  },
  {
    id: "4",
    cameraId: "1",
    type: "EPI",
    timestamp: "2025-07-28T20:10:00",
    imageUrl: "https://placehold.co/300x180?text=EPI+2",
  },
  {
    id: "5",
    cameraId: "2",
    type: "Invasão",
    timestamp: "2025-07-28T20:05:00",
    imageUrl: "https://placehold.co/300x180?text=Invasao+3",
  },
  {
    id: "6",
    cameraId: "3",
    type: "EPI",
    timestamp: "2025-07-31T20:00:00",
    imageUrl: "https://placehold.co/300x180?text=EPI+3",
  },
  {
    id: "7",
    cameraId: "1",
    type: "Invasão",
    timestamp: "2025-08-01T19:50:00",
    imageUrl: "https://placehold.co/300x180?text=Invasao+4",
  },
  {
    id: "8",
    cameraId: "2",
    type: "EPI",
    timestamp: "2025-08-02T19:45:00",
    imageUrl: "https://placehold.co/300x180?text=EPI+4",
  },
];
