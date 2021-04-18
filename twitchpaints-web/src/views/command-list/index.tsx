import { List, ListItem, ListProps, Text } from '@chakra-ui/react';
import { canvasConfig } from '../../config';

type CommandProps = {
    command: string;
    description: string;
};

const Command = ({ command, description }: CommandProps) => {
    return (
        <ListItem fontSize="xs">
            <Text fontWeight="bold">{command}</Text>
            <Text fontSize="xx-small">{description}</Text>
        </ListItem>
    );
};

const CommandList = (props: ListProps) => {
    return (
        <List {...props}>
            <ListItem fontWeight="semibold" textAlign="center">
                <Text>Commands</Text>
                <Text fontWeight="normal" fontSize="xx-small">
                    {`X/Y are between 0-${canvasConfig.canvasWidth - 1}`}
                </Text>
            </ListItem>

            <Command
                command="!pixel x y color"
                description="Draws a pixel to the canvas at the specified coordinates"
            />

            <Command
                command="!line x1 y1 x2 y2 color"
                description="Draws a line to the canvas from one point to another point"
            />

            <Command
                command="!circle x y radius color"
                description="Draws a circle to the canvas at the specified coordinates"
            />
            <Command
                command="!rectangle x1 y1 x2 y2 color"
                description="Draws a rectangle to the canvas, top left as x1/y1 and bottom right as x2/y2"
            />
        </List>
    );
};

export default CommandList;
