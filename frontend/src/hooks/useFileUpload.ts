import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable } from "firebase/storage";

const useFileUpload = (storage: any, nome: string) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;
    const preview = URL.createObjectURL(selectedFile);
    setPreviewUrl(preview);
    setFile(selectedFile);
  };

  const { getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: true,
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("entrei")
    console.log(file)
    if (!file) return;
    try {
      console.log("entrei no try")
        const storageRef = ref(
          storage,
          `images/${nome}/profile.jpg`
        );
        uploadBytesResumable(storageRef, file as Blob);
      } catch (error) {
        console.error(error);
      }
  };

  return { previewUrl, getInputProps, isDragActive, handleUpload, setPreviewUrl };
};

export default useFileUpload;
