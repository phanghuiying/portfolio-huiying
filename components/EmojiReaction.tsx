import { VStack, Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";

const EmojiReaction: NextPage = () => {
  return (
    <VStack pr={5}>
        <Text fontSize="lg" as="b">
          How was your day? 😄
        </Text>
      </VStack>
  );
};

export default EmojiReaction;
