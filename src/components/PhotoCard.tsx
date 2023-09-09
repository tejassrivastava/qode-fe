import { AspectRatio, Box, Center, Text, Image } from "@chakra-ui/react";

// Defining a component for displaying a photo and its comment
const PhotoCard = ({ id, url, comment }:any) : JSX.Element => {
  {
    console.log(url);
  }
  return (
    <Box
      key={id}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={4}
    >
      <AspectRatio maxW="400px" ratio={4 / 4}>
        <Image src={url} alt="Photo" objectFit="cover" />
      </AspectRatio>
      <Center>
        <Text mt={2} color="lightskyblue">
          {comment}
        </Text>
      </Center>
    </Box>
  );
};
export default PhotoCard;
