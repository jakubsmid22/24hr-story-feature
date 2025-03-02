import { useEffect, useState } from "react";
import Container from "./components/Container";

const App = () => {
  const [images, setImages] = useState<{ url: string; added: string }[]>(
    JSON.parse(localStorage.getItem("images") || "[]"),
  );

  useEffect(() => {
    const now = new Date().getTime();
    const filteredImages = images.filter((image) => {
      return now - new Date(image.added).getTime() <= 24 * 60 * 60 * 1000;
    });

    if (filteredImages.length !== images.length) {
      setImages(filteredImages);
      localStorage.setItem("images", JSON.stringify(filteredImages));
    }
  }, []);

  return (
    <main className="flex h-screen justify-center px-5 pt-10">
      <Container images={images} />
    </main>
  );
};

export default App;
