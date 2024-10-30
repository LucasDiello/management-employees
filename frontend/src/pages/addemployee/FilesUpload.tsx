import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import userDefault from "./userDefault.jpg";

const FileUpload: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRounded, setIsRounded] = useState(false); // Estado para controlar o arredondamento da imagem

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    console.log(file);
  };

  const { getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: true,
  });

  return (
    <div>
      <h2>Foto do perfil</h2>
      <div>
        <input {...getInputProps()} />
        <div>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100px", height: "100px", margin: "10px" }}
              className={isRounded ? "rounded" : ""}
            />
          ) : (
            <img
              src={userDefault}
              alt="User Default"
              width={"100px"}
              height={"100px"}
              className={isRounded ? "rounded" : ""}
            />
          )}
        </div>
      </div>
      <button
        onClick={() =>
          (
            document.querySelector('input[type="file"]') as HTMLInputElement
          )?.click()
        }
      >
        Adicionar foto
      </button>
      <label>
        Arredondar foto
        <input
          type="checkbox"
          onChange={() => setIsRounded(!isRounded)} // Atualiza o estado ao marcar/desmarcar o checkbox
        />
      </label>
    </div>
  );
};

export default FileUpload;
