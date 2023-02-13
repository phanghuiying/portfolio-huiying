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
  const [isInitialState, setIsInitialState] = useState<boolean>(true);
  const [isNameInvalid, setIsNameInvalid] = useState<boolean>(true);
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(true);
  const [isMessageInvalid, setIsMessageInvalid] = useState<boolean>(true);

  const validateEmail = (em: string): boolean => {
    var re = /\S+@\S+\.\S+/;
    return re.test(em);
  };

  const isFormSubmitButtonEnabled = !(
    isNameInvalid ||
    isEmailInvalid ||
    isMessageInvalid
  );

  const handleSubmit = () => {
    addMessage({ name: name, email: email, message: message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <VStack pl={5}>
        <Text fontSize="lg" as="b" data-testid="text">
          Send me a message! 😄
        </Text>
        <FormControl isInvalid={!isInitialState && isNameInvalid}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => {
              setIsInitialState(false);
              setName(e.target.value);
              if (e.target.value === "") {
                setIsNameInvalid(true);
              } else {
                setIsNameInvalid(false);
              }
            }}
          />
          <FormErrorMessage role="alert">Name is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!isInitialState && isEmailInvalid}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setIsInitialState(false);
              setEmail(e.target.value);
              if (email === "" || !validateEmail(email)) {
                setIsEmailInvalid(true);
              } else {
                setIsEmailInvalid(false);
              }
            }}
          />
          <FormHelperText>{"We'll never share your email."}</FormHelperText>
          <FormErrorMessage role="alert">
            {email === ""
              ? "Email is required."
              : "Please enter a valid email."}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!isInitialState && isMessageInvalid}>
          <FormLabel>Message</FormLabel>
          <Input
            type="string"
            value={message}
            onChange={(e) => {
              setIsInitialState(false);
              setMessage(e.target.value);
              if (message === "") {
                setIsMessageInvalid(true);
              } else {
                setIsMessageInvalid(false);
              }
            }}
          />
          <FormErrorMessage role="alert">
            Message cannot be empty.
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="pink"
          type="submit"
          isDisabled={!isFormSubmitButtonEnabled}
          onClick={handleSubmit}
          role="button"
        >
          Submit
        </Button>
      </VStack>
    </>
  );
};

export default MessageForm;
