import React, { useState } from "react";
import { Box, Heading, Center, SimpleGrid } from "@chakra-ui/react";

import UploadForm from "./components/UploadForm.tsx";
import PhotoList from "./components/PhotoList.tsx";

const App = ():JSX.Element => {
  type Photo = {
    id: number;
    url: string;
    comment: string;
  };
  const [photos, setPhotos] = useState<Photo[]>([]);
  return (
    <Box bgColor="gray.800" w="100vw" minH="100vh" p={8}>
      <Center>
        <Heading as="h1" size="xl" mb={8} color="white">
          Photo App
        </Heading>
      </Center>
      <UploadForm photoupdate={setPhotos} />
      {photos && photos.length > 0 && <><Center>
        <Heading as="h1" size="xl" mb={8} color="white" paddingTop="50px">
          Gallery
        </Heading>
      </Center>
      <SimpleGrid minChildWidth="400px" spacing="1px" paddingTop="20px">
        <PhotoList photos={photos} photoupdate={setPhotos} />
      </SimpleGrid> </>}
    </Box>
  );
};

export default App;
