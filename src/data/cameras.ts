export type CameraStatus = 'online' | 'offline' | 'alert';

export type Camera = {
    id: string;
    name: string;
    videoUrl: string;
    latitude: number;
    longitude: number;
    status: CameraStatus;
}

export const mockCameras: Camera[] = [
    {
        id: '1',
        name: 'Entrada Principal',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        latitude: -23.5505,
        longitude: -46.6333,
        status: 'online',
    },
    {
        id: '2',
        name: 'Corredor Fábrica',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
        latitude: -23.5510,
        longitude: -46.6340,
        status: 'alert',
    },
    {
        id: '3',
        name: 'Estacionamento',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        latitude: -23.5520,
        longitude: -46.6350,
        status: 'offline',
    },
];
