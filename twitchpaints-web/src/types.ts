export type PixelRequest = {
    x: number;
    y: number;
    color: string;
};

export type LineRequest = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
};

export type CircleRequest = {
    x: number;
    y: number;
    radius: number;
    color: string;
};

export type RectangleRequest = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
};

export type ChatRequest = {
    username: string;
    message: string;
};

export type ChatRequestReceived = ChatRequest & {
    time: Date;
};
