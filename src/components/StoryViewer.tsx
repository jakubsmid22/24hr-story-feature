import { useEffect, useState, useRef } from "react";

const StoryViewer = ({
  startingIndex,
  closeStory,
}: {
  startingIndex: number;
  closeStory: () => void;
}) => {
  const images = JSON.parse(localStorage.getItem("images") || "[]");
  const containerRef = useRef<HTMLDivElement>(null);

  const [miliSeconds, setMiliSeconds] = useState(0);
  const [currentImage, setCurrentImage] = useState(startingIndex);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
    setMiliSeconds(0);
  };

  useEffect(() => {
    if (miliSeconds >= 3000) {
      nextImage();
    }

    const interval = setInterval(() => {
      setMiliSeconds((prev) => prev + 50);
    }, 50);

    return () => clearInterval(interval);
  }, [miliSeconds]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      closeStory();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-slate-900/25">
      <div
        ref={containerRef}
        className="relative flex min-h-[750px] w-full max-w-[1000px] flex-col justify-center gap-10 rounded-md bg-white"
      >
        <div className="absolute top-0 right-0 left-0 flex gap-2 bg-slate-500/50 p-5">
          {images.map((_: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setCurrentImage(index);
                setMiliSeconds(0);
              }}
              className="relative h-2 w-10 cursor-pointer overflow-hidden border bg-gray-300"
            >
              <div
                className="absolute top-0 bottom-0 left-0 bg-black transition-all duration-[50ms]"
                style={{
                  width:
                    index === currentImage
                      ? `${(miliSeconds / 3000) * 100}%`
                      : index < currentImage
                        ? "100%"
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <img
            className="max-w-[500px] w-[90%] object-cover"
            src={images[currentImage]?.url}
            alt="Story"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
