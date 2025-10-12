import { useState, useCallback } from "react";
import axios from "axios";

export const usePexelsImage = (query = "motivation") => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Učitavanje API ključa iz .env.local
  const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

  const fetchImage = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: API_KEY,
        },
        params: {
          query,
          per_page: 20,
        },
      });

      const photos = response.data.photos;
      if (photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * photos.length);
        setImage(photos[randomIndex].src.large);
      } else {
        setImage(null);
      }
    } catch (error) {
      console.error("Greška pri dohvatanju slike sa Pexels API-ja:", error);
      setImage(null);
    } finally {
      setLoading(false);
    }
  }, [query, API_KEY]);

  return { image, loading, fetchImage };
};
