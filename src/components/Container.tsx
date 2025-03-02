import { useState } from "react";
import AddStory from "./AddStory";
import Story from "./Story";
import StoryViewer from "./StoryViewer";

const Container = ({ images }: { images: { url: string }[] }) => {
  const [showStoryIndex, setShowStoryIndex] = useState<number | null>(null);

  const setShowStory = (index: number) => {
    setShowStoryIndex(index);
  };

  const closeStory = () => {
    setShowStoryIndex(null);
  };

  return (
    <div className="flex h-fit w-full max-w-[1000px] items-center gap-5 overflow-x-auto rounded-md border p-5">
      <AddStory />
      <div className="flex gap-5">
        {images.map((image: { url: Base64URLString }, index: number) => {
          return (
            <Story
              setShowStory={setShowStory}
              showStory={showStoryIndex === index}
              key={index}
              index={index}
              image={image.url}
            />
          );
        })}
      </div>
      {showStoryIndex !== null && (
        <StoryViewer startingIndex={showStoryIndex} closeStory={closeStory} />
      )}
    </div>
  );
};

export default Container;
