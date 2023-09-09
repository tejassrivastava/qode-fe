import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  HStack,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "../api";
import { useRef, useState } from "react";

// Defining a component for uploading a photo and adding a comment
const UploadForm  = (props: { photoupdate: any; }) : JSX.Element => {
  const { photoupdate } = props;
  const toast = useToast();
  // Defining state variables for file and comment inputs
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState<string>("");
  const [buttonloading, setbuttonloading] = useState(false);
  const [progress, setProgress] = useState(0);
  // Defining a type for photo data

  // Defining a function for handling file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const ref:any = useRef();
  const fetchPhotos = async () => {
    const data = await axios.get("/getPhoto");
    if (data) {
      photoupdate(data.data);
    }
  };

  // Defining a function for handling comment input change
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // Defining a function for handling form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setbuttonloading(true);
    e.preventDefault();
    if (file) {
      // Creating a form data object for the file and comment
      const formData = new FormData();
      formData.append("photo", file);
      console.log(comment);
      formData.append("comment", comment);
      const config = {
        onUploadProgress: (progressEvent: any) => {
          console.log(progressEvent.loaded);
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setProgress(percentage);
        },
      };
      // Making a POST request to the backend with the form data
      axios
        .post("/upload", formData, config)
        .then((res) => {
          toast({
            position: "top-right",
            render: () => (
              <Box color="white" p={3} bg="green.500">
                Upload Successfull
              </Box>
            ),
          });
          console.log(res.data);
          // Clearing the file and comment inputs
          setFile(null);
          setComment("");
          setbuttonloading(false);
          setProgress(0);
          ref.current.value = "";
          fetchPhotos();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Container maxW="xl" centerContent color="lightskyblue">
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        m={4}
      >
        <Heading as="h3" size="md" mb={4}>
          Upload a photo
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            mb={6}
            ref={ref}
          />
          <Input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={handleCommentChange}
            mb={6}
          />
          <HStack>
            <Button
              type="submit"
              isLoading={buttonloading}
              loadingText="Submitting"
              colorScheme="blue"
              variant="outline"
              isDisabled={buttonloading || comment === "" || file === null}
            >
              Upload
            </Button>
            {buttonloading && (
              <CircularProgress size="40px" value={progress} color="green.400">
                <CircularProgressLabel>{progress}%</CircularProgressLabel>
              </CircularProgress>
            )}
          </HStack>
          {/* <Button type="submit" colorScheme="blue">
            Upload
          </Button> */}
        </form>
      </Box>
    </Container>
  );
};
export default UploadForm;
