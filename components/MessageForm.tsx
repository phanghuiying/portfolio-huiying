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
import { useState } from "react";
import { NextPage } from "next";

const MessageForm: NextPage = () => {
  const [name, settName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isNameInvalid, setIsNameInvalid] = useState<boolean>(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isMessageInvalid, setIsMessageInvalid] = useState<boolean>(false);

  const isSubmitting = true;

  const validateEmail = (em: string): boolean => {
    var re = /\S+@\S+\.\S+/;
    return re.test(em);
  };

  const validateFields = (): boolean => {
    setIsNameInvalid(false);
    setIsEmailInvalid(false);
    setIsMessageInvalid(false);

    if (name === "") {
      setIsNameInvalid(true);
    }

    if (email === "" || !validateEmail(email)) {
      setIsEmailInvalid(true);
    }

    if (message === "") {
      setIsMessageInvalid(true);
    }

    if (isNameInvalid || isEmailInvalid || isMessageInvalid) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    const validation = validateFields()
    console.log("submit button clicked")
    if (validation) {
        // handle submit api
    } else {
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
            onChange={(e) => settName(e.target.value)}
          />
          <FormErrorMessage>Name is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={isEmailInvalid}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setMessage(e.target.value)}
          />
          <FormErrorMessage>Message cannot be empty.</FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="pink"
          isLoading={!isSubmitting}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </VStack>
    </>
  );
};

export default MessageForm;
