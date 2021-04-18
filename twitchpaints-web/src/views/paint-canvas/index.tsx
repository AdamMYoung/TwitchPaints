import { Box, BoxProps } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useCircleMessages, useLineMessages, usePixelMessages, useRectangleMessages } from '../../hooks/useSocket';
import { getCanvasContext, paintCircle, paintLine, paintPixel, paintRectangle } from '../../utils/canvas';

type Props = BoxProps & {
    canvasSize: number;
};

const PaintCanvas = ({ canvasSize, ...rest }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelReq = usePixelMessages();
    const lineReq = useLineMessages();
    const circleReq = useCircleMessages();
    const rectReq = useRectangleMessages();

    useEffect(() => {
        const canvasContext = getCanvasContext(canvasRef);
        if (canvasContext && pixelReq) paintPixel(pixelReq, canvasContext);
    }, [pixelReq]);

    useEffect(() => {
        const canvasContext = getCanvasContext(canvasRef);
        if (canvasContext && lineReq) paintLine(lineReq, canvasContext);
    }, [lineReq]);

    useEffect(() => {
        const canvasContext = getCanvasContext(canvasRef);
        if (canvasContext && circleReq) paintCircle(circleReq, canvasContext);
    }, [circleReq]);

    useEffect(() => {
        const canvasContext = getCanvasContext(canvasRef);
        if (canvasContext && rectReq) paintRectangle(rectReq, canvasContext);
    }, [rectReq]);

    return (
        <Box w={canvasSize} h={canvasSize} {...rest}>
            <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
        </Box>
    );
};

export default PaintCanvas;
