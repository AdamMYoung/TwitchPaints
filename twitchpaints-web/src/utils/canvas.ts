import { CircleRequest, LineRequest, PixelRequest, RectangleRequest } from '../types';
import { canvasConfig } from '../config';

const { pixelSize } = canvasConfig;

const getScaledCoords = (x: number, y: number) => {
    // to decrease smoothing for numbers with decimal part
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);

    const scaledX = roundedX * pixelSize;
    const scaledY = roundedY * pixelSize;

    return { scaledX, scaledY };
};

export const paintPixel = ({ x, y, color }: PixelRequest, canvas: CanvasRenderingContext2D) => {
    const { scaledX, scaledY } = getScaledCoords(x, y);

    canvas.beginPath();
    canvas.fillStyle = color || '#000';
    canvas.fillRect(scaledX, scaledY, pixelSize, pixelSize);
    canvas.fill();
};

export const paintLine = ({ x1, y1, x2, y2, color }: LineRequest, canvas: CanvasRenderingContext2D) => {
    let { scaledX: scaledX1, scaledY: scaledY1 } = getScaledCoords(x1, y1);
    let { scaledX: scaledX2, scaledY: scaledY2 } = getScaledCoords(x2, y2);

    var dx = Math.abs(scaledX2 - scaledX1);
    var dy = Math.abs(scaledY2 - scaledY1);
    var sx = scaledX1 < scaledX2 ? 1 : -1;
    var sy = scaledY1 < scaledY2 ? 1 : -1;
    var err = dx - dy;

    while (true) {
        canvas.beginPath();
        canvas.fillStyle = color || '#000';
        canvas.fillRect(scaledX1, scaledY1, pixelSize, pixelSize);
        canvas.fill();

        if (scaledX1 === scaledX2 && scaledY1 === scaledY2) break;
        var e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            scaledX1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            scaledY1 += sy;
        }
    }
};

export const paintCircle = ({ x, y, radius, color }: CircleRequest, canvas: CanvasRenderingContext2D) => {
    const { scaledX, scaledY } = getScaledCoords(x, y);

    const n = Math.ceil(2.0 * Math.PI * radius); // integer number of points (rounded up)
    const da = (2.0 * Math.PI) / n; // floating angular step between points

    for (let a = 0.0, i = 0; i < n; i++, a += da) {
        const xPos = scaledX + radius * Math.cos(a);
        const yPos = scaledY + radius * Math.sin(a);

        canvas.beginPath();
        canvas.fillStyle = color || '#000';
        canvas.fillRect(xPos, yPos, pixelSize, pixelSize);
        canvas.fill();
    }
};

export const paintRectangle = ({ x1, y1, x2, y2, color }: RectangleRequest, canvas: CanvasRenderingContext2D) => {
    const top = { x1: x1, y1: y1, x2: x2, y2: y1 };
    const bottom = { x1: x1, y1: y2, x2: x2, y2: y2 };
    const left = { x1: x1, y1: y1, x2: x1, y2: y2 };
    const right = { x1: x2, y1: y1, x2: x2, y2: y2 };

    paintLine({ ...top, color }, canvas);
    paintLine({ ...bottom, color }, canvas);
    paintLine({ ...left, color }, canvas);
    paintLine({ ...right, color }, canvas);
};

export const getCanvasContext = (canvas: React.RefObject<HTMLCanvasElement>) => {
    if (canvas.current) {
        return canvas.current.getContext('2d');
    }
};
