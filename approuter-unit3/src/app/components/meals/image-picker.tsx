"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
type ImagePickerType = {
  label: string;
  name: string;
};

export default function ImagePicker({ label, name }: ImagePickerType) {
  const [pickedImage, setPickedImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  function handlePickClick() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by user"
              fill
            ></Image>
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleFileChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
      {pickedImage && (
        <div className={classes.preview}>
          <p>Selected file: {pickedImage.name}</p>
        </div>
      )}
    </div>
  );
}
