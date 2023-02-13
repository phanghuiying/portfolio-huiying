import { VStack, Box, Text, Button, HStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useState } from "react";

const EmojiReaction: NextPage = () => {
  const emojis = ["😣", "🙁", "🙂", "😄"];
  const [emoji, setEmoji] = useState<string>("");

  return (
    <VStack pr={5}>
      <Text fontSize="lg" as="b">
        How was your day? 😄
      </Text>
      <Text>{emoji}</Text>
      <HStack>
        {emojis.map((mood) => {
          return <Button onClick={() => setEmoji(mood)} key={emojis.indexOf(mood)}>{mood}</Button>;
        })}
      </HStack>
    </VStack>
  );
};

export default EmojiReaction;
