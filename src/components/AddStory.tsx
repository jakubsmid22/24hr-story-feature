const AddStory = () => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    let images = JSON.parse(localStorage.getItem("images") || "[]");

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        images.push({ url: reader.result, added: new Date(), seen: false });
        localStorage.setItem("images", JSON.stringify(images));
      };

      reader.readAsDataURL(file);
      window.location.reload();
    }
  };

  return (
    <>
      <input
        onInput={handleImageUpload}
        type="file"
        id="image"
        className="hidden"
      />
      <label
        htmlFor="image"
        className="flex h-20 w-20 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border text-4xl text-gray-400"
      >
        +
      </label>
    </>
  );
};

export default AddStory;
