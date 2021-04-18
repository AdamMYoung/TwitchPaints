import { Container, VStack } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';

import { canvasConfig } from './config';

import { Flex } from '@chakra-ui/react';
import MessageList from './views/message-list';
import CommandList from './views/command-list';
import PaintCanvas from './views/paint-canvas';

const { canvasSize } = canvasConfig;

function App() {
    return (
        <Container maxW="container.xl">
            <Box textAlign="center">
                <Text fontWeight="bold" fontSize="4xl">
                    TwitchPaints
                </Text>

                <Flex justifyContent="center" mx="auto">
                    <PaintCanvas mx="4" mt="4" boxShadow="2xl" canvasSize={canvasSize} />
                    <VStack spacing="3" mt="4">
                        <MessageList p="4" w="64" h="full" rounded="md" boxShadow="xl" />
                        <CommandList spacing="1" rounded="md" boxShadow="xl" w="64" p="4" />
                    </VStack>
                </Flex>
            </Box>
        </Container>
    );
}

export default App;
