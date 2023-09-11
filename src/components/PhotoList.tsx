import { useEffect } from "react";
import PhotoCard from "./PhotoCard";
import axios from "../api";

// Defining a component for displaying all the photos and their comments
const PhotoList = (props: { photos: any; }) :JSX.Element => {
  // Defining a state variable for storing the photos data
  const { photos } = props;



  return (
    <>
      {photos.map((photo: { id: any }) => (
        <PhotoCard key={photo.id} {...photo} />
      ))}
    </>
  );
};

export default PhotoList;
