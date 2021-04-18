import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ChatRequest, CircleRequest, LineRequest, PixelRequest, RectangleRequest } from '../types';

const socket = io('localhost:4000');

function useSocketRequest<T>(eventName: string) {
    const [request, setRequest] = useState<T>();

    useEffect(() => {
        socket.on(eventName, setRequest);

        return () => {
            socket.off(eventName, setRequest);
        };
    }, [setRequest, eventName]);

    return request;
}

export const usePixelMessages = () => useSocketRequest<PixelRequest>('pixel');
export const useLineMessages = () => useSocketRequest<LineRequest>('line');
export const useCircleMessages = () => useSocketRequest<CircleRequest>('circle');
export const useRectangleMessages = () => useSocketRequest<RectangleRequest>('rectangle');
export const useChatMessages = () => useSocketRequest<ChatRequest>('chat');
