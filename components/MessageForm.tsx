import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

interface Dictionary {
  [key: string]: any;
}
interface MessageFormProps {
  addMessage: (item: Dictionary) => void;
}

const MessageForm = ({ addMessage }: MessageFormProps): ReactElement => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isMessageInvalid, setIsMessageInvalid] = useState<boolean>(false);

  const validateEmail = (em: string): boolean => {
    var re = /\S+@\S+\.\S+/;
    return re.test(em);
  };

  const handleSubmit = () => {
    if (isNameInvalid || isEmailInvalid || isMessageInvalid) {
      return;
    } else {
      addMessage({ name: name, email: email, message: message });
      setName("");
      setEmail("");
      setMessage("");
      return;
    }
  };

  return (
    <>
      <VStack pl={5}>
        <Text fontSize="lg" as="b">
          Send me a message! 😄
        </Text>
        <FormControl isInvalid={isNameInvalid}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value === "") {
                setIsNameInvalid(true);
              } else {
                setIsNameInvalid(false);
              }
            }}
          />
          <FormErrorMessage>Name is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={isEmailInvalid}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (email === "" || !validateEmail(email)) {
                setIsEmailInvalid(true);
              } else {
                setIsEmailInvalid(false);
              }
            }}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
          <FormErrorMessage>
            {email === ""
              ? "Email is required."
              : "Please enter a valid email."}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={isMessageInvalid}>
          <FormLabel>Message</FormLabel>
          <Input
            type="string"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (message === "") {
                setIsMessageInvalid(true);
              } else {
                setIsMessageInvalid(false);
              }
            }}
          />
          <FormErrorMessage>Message cannot be empty.</FormErrorMessage>
        </FormControl>
        <Button mt={4} colorScheme="pink" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </>
  );
};

export default MessageForm;
