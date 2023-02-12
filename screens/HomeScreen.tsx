import { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Button,
  Text,
  Container,
  Flex,
  Image,
  HStack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import EmojiReaction from "@/components/EmojiReaction";
import MessageForm from "@/components/MessageForm";
import { useState, useEffect, useCallback } from "react";
import MessageDisplay from "@/components/MessageDisplay";

interface MessagesDictionary {
  [key: string]: Array<Dictionary>;
}

interface Dictionary {
  [key: string]: any;
}

const HomeScreen: NextPage = () => {
  const [messages, setMessages] = useState<MessagesDictionary>({
    messages: [],
  });

  const addMessageToData = (item: Dictionary): void => {
    console.log("message to post", item);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };

    fetch("http://localhost:9000/messages", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          fetch("http://localhost:9000/messages").then((response) => {
            response.json().then((msgs: Array<Dictionary>) => {
              setMessages({
                messages: msgs,
              });
              console.log(messages);
            });
          });
        }
      })
  };

  const deleteMessage = useCallback(
    (msg: Dictionary) => {
      console.log("deleted message called");
      const msgs = messages["messages"];
      const requestOptions = {
        method: "DELETE",
      };
      fetch(`http://localhost:9000/messages/${msg.id}`, requestOptions).then(
        (response) => {
          if (response.ok) {
            const idx = msgs.indexOf(msg);
            msgs.splice(idx, 1); // delete 1 item starting from idx
            setMessages({ messages: msgs });
          }
        }
      );
    },
    [messages]
  );

  useEffect(() => {
    fetch("http://localhost:9000/messages").then((response) => {
      response.json().then((msgs: Array<Dictionary>) => {
        setMessages({
          messages: msgs,
        });
        console.log(messages);
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Phang Hui Ying</title>
        <meta name="description" content="My portfolio / 简历" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="section" pb={{ base: "12", md: "24" }}>
        <Box
          as="nav"
          bg="bg-surface"
          boxShadow={useColorModeValue("sm", "sm-dark")}
        >
          <Container py={{ base: "4", lg: "5" }}>
            <HStack spacing="10" justify="space-between">
              <Text as="kbd">Hui Ying</Text>
            </HStack>
          </Container>
        </Box>
        <Box p={10}>
          <Flex justify="center">
            <VStack>
              <Image
                borderRadius="full"
                boxSize="200px"
                src="/huiying.jpg"
                alt="Hui Ying"
              />
              <Text pt={5} as="b" color="pink.500" fontSize="2xl">
                Phang Hui Ying
              </Text>
              <Text fontSize="md" as="b">
                Technology Analyst at Bank of Singapore
              </Text>
              <HStack pt={5} spacing={5}>
                <a
                  href="https://www.linkedin.com/in/phang-hui-ying-ba3567a6/"
                  target="_blank"
                >
                  <BsLinkedin size="1.25em" className="icon" />
                </a>
                <a href="https://github.com/phanghuiying" target="_blank">
                  <BsGithub size="1.25em" className="icon" />
                </a>
              </HStack>
              <HStack pt={8}>
                <EmojiReaction />
                <MessageForm addMessage={addMessageToData} />
              </HStack>
            </VStack>
          </Flex>
        </Box>
        <Box>
          <MessageDisplay
            msgs={messages["messages"]}
            deleteMessage={deleteMessage}
          />
        </Box>
      </Box>
    </>
  );
};

export default HomeScreen;
