"use client";

import { Button, Empty, Modal, message as showMessage } from "antd";
import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  CloseOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
} from "@ant-design/icons";

const ImageEditor = ({ originalImageUrl, onSaveImage, closeEditor }) => {
  const [imageUrl, setImageUrl] = useState(originalImageUrl);
  const [imageName, setImageName] = useState("image");
  const imgPickerRef = useRef();
  const cropperRef = useRef();

  const pick = () => {
    imgPickerRef.current?.click();
  };

  const change = ({ target: { files } }) => {
    const image = files[0];
    if (!image) return;
    if (
      image.name.toLowerCase().includes("heic") ||
      image.name.toLowerCase().includes("heif")
    ) {
      imgPickerRef.current.value = null;
      return showMessage.error("Unsupported file type");
    }

    setImageName(image.name);
    const imageReader = new FileReader();
    imageReader.onload = ({ target: { result } }) => {
      setImageUrl(result);
    };
    imageReader.readAsDataURL(image);
  };

  const rotate = (direction) => {
    cropperRef.current?.cropper.clear();
    cropperRef.current?.cropper.rotate(direction === "right" ? 90 : -90);
    cropperRef.current?.cropper.crop();
  };

  const reset = () => {
    cropperRef.current?.cropper.reset();
  };

  const crop = () => {
    cropperRef.current?.cropper
      .getCroppedCanvas({
        width: 360,
        height: 360,
        fillColor: "#ffffff",
        imageSmoothingQuality: "high",
      })
      .toBlob((croppedBlob) => {
        if (croppedBlob.size / (1024 * 1024) > 1) {
          showMessage.error("Image size should be less than 1mb");
        } else {
          onSaveImage(
            new File(
              [croppedBlob],
              (imageName.split(".").length > 1
                ? imageName.split(".").slice(0, -1).join(".")
                : imageName) + ".webp",
              {
                type: croppedBlob.type,
              }
            )
          );
        }
      }, "image/webp");
  };

  return (
    <>
      <Modal
        title="Edit Image"
        centered
        open={true}
        okText="Save"
        onOk={() => crop()}
        onCancel={() => closeEditor()}
      >
        <input
          className="hidden w-0 h-0"
          type="file"
          accept="image/png, image/jpeg"
          ref={imgPickerRef}
          onChange={change}
        />
        {imageUrl ? (
          <Cropper
            className="mx-auto my-5 w-2/3 aspect-square"
            src={imageUrl}
            ref={cropperRef}
            initialAspectRatio={1}
            viewMode={1}
            dragMode="move"
            aspectRatio={1}
            crossOrigin="anonymous"
          />
        ) : (
          <Empty className="my-10" description="No Image Selected" />
        )}
        <div className="flex gap-5 justify-center items-center my-5">
          <div className="flex flex-col items-center">
            <Button
              onClick={() => pick()}
              icon={<SwapOutlined />}
              type="primary"
              size="middle"
            />
            <span className="mt-1 text-xs">Update Image</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={() => rotate("left")}
              icon={<RotateLeftOutlined />}
              type="primary"
              size="middle"
            />
            <span className="mt-1 text-xs">Rotate Left</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={() => rotate("right")}
              icon={<RotateRightOutlined />}
              type="primary"
              size="middle"
            />
            <span className="mt-1 text-xs">Rotate Right</span>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={() => reset()}
              icon={<CloseOutlined />}
              type="primary"
              size="middle"
            />
            <span className="mt-1 text-xs">Reset</span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageEditor;
