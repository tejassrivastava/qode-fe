import { useEffect } from "react";
import PhotoCard from "./PhotoCard";
import axios from "../api";

// Defining a component for displaying all the photos and their comments
const PhotoList = (props: { photos: any; photoupdate: any; }) :JSX.Element => {
  // Defining a state variable for storing the photos data
  const { photos, photoupdate } = props;

  // Defining a function for fetching the photos data from the backend
  const fetchPhotos = async () => {
    const data = await axios.get("/getPhoto");
    if (data) {
      photoupdate(data.data);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      {photos.map((photo: { id: any }) => (
        <PhotoCard key={photo.id} {...photo} />
      ))}
    </>
  );
};

export default PhotoList;
