import { Box, BoxProps, Divider, List, ListItem, Stat, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useChatMessages } from '../../hooks/useSocket';
import { ChatRequestReceived } from '../../types';

const MessageList = (props: BoxProps) => {
    const [messages, setMessages] = useState<ChatRequestReceived[]>([]);
    const latestMessage = useChatMessages();

    useEffect(() => {
        latestMessage && setMessages((m) => [{ ...latestMessage, time: new Date() }, ...m]);
    }, [latestMessage]);

    return (
        <Box {...props}>
            <VStack spacing="4" divider={<Divider />}>
                <Stat>
                    <StatLabel>Commands Received</StatLabel>
                    <StatNumber>{messages.length}</StatNumber>
                </Stat>

                <Box w="full">
                    <Text fontWeight="semibold" textAlign="center">
                        Recent Messages
                    </Text>
                    <List mt="2" px="2" spacing="0.5" w="full" maxH="175" overflowY="auto" textAlign="start">
                        {messages.map((msg) => (
                            <ListItem fontSize="xs">
                                <Text>{msg.message}</Text>
                                <Text fontSize="xx-small">
                                    {msg.time.toLocaleTimeString()}
                                    <b> {msg.username}</b>
                                </Text>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </VStack>
        </Box>
    );
};

export default MessageList;
