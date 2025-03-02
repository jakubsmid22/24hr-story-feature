const Story = ({
  image,
  index,
  setShowStory,
}: {
  image: Base64URLString;
  index: number;
  showStory: boolean;
  setShowStory: (x: number) => void;
}) => {
  const handleClick = () => {
    setShowStory(index);
  };

  return (
    <div
      onClick={handleClick}
      className="h-20 w-20 flex-shrink-0 cursor-pointer rounded-full border-2 border-gray-500/50"
    >
      <img
        src={image}
        alt="story"
        className="h-full w-full rounded-full object-cover"
      />
    </div>
  );
};

export default Story;
