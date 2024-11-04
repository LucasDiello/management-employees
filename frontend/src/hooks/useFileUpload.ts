import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable } from "firebase/storage";

const useFileUpload = (storage: any, id: string) => {
  console.log("entrei no useFileUpload", id);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Novo estado para controlar o upload

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

  useEffect(() => {
    if (!file || !id || isUploading) return; // Garante que o id está correto e evita uploads duplicados

    const handleUpload = async () => {
      console.log("entrei no try");
      setIsUploading(true);
      try {
        const storageRef = ref(storage, `images/${id}/profile.jpg`);
        await uploadBytesResumable(storageRef, file as Blob);
        console.log("Upload completo");
      } catch (error) {
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    };

    handleUpload();
  }, [id, file, storage]); // Executa o upload apenas quando o id e o arquivo estão corretos

  return { previewUrl, getInputProps, isDragActive, setPreviewUrl };
};

export default useFileUpload;
