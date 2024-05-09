/* eslint-disable react/prop-types */
import { useEffect } from "react";

function UploadWidget({ uwConfig, setState }) {
  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          setState((prev) => [...prev, result.info.secure_url]);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      () => {
        myWidget.open();
      },
      false
    );

    return () => {
      document.querySelector("iframe").remove();
    };
  }, []);

  return (
    <>
      <button id="upload_widget">Imágenes</button>
    </>
  );
}

export default UploadWidget;
