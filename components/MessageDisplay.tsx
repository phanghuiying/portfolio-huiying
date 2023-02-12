import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

interface Dictionary {
    [key: string]: any;
}

interface MessageDisplayProps {
    msgs: Dictionary[];
    deleteMessage: (msgs: Dictionary) => void;
  }

const MessageDisplay = ({ msgs, deleteMessage }: MessageDisplayProps) => {
  const showMessage = (msg: Dictionary) => {
    return (
      <Card>
        <CardHeader>
          <Heading size="md">{msg["name"]}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{msg["message"]}</Text>
        </CardBody>
        <CardFooter>
          <Button onClick={() => deleteMessage(msg)}>Delete</Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      padding={10}
    >
        {msgs.map(showMessage)}
    </SimpleGrid>
  );
};

export default MessageDisplay;
