import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormData } from "../types";
import { SelectChangeEvent } from "@mui/material";
import gerarPDF from "../temp/gerarPDF";
import useFileUpload from "./useFileUpload";
import { storage } from "../libs/firebaseConfig";
import { apiRequest } from "../libs/apiRequest";

const useFormWizard = () => {
    const steps = ["1", "2", "3"];
    const stepsText: { [key: string]: string }[] = [
      { "0": "Informações de Contato" },
      { "1": "Informações do Funcionário" },
      { "2": "Conclusão" },
    ];
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({
      contato: {
        nome: "",
        email: "",
        sexo: "",
        cpf: "",
        rg: "",
        endereco: {
          rua: "",
          numero: "",
          bairro: "",
          cidade: "",
          estado: "",
          cep: "",
        },
        telefone: "",
        fotoPerfil: "",
        dataAniversario: "",
      },
      funcionario: {
        status: "",
        cargo: "",
        dataAdmissao: "",
        setor: "",
        salario: "",
      },
    });
    const [loading, setLoading] = useState(false);
    const { handleUpload } = useFileUpload(storage, formData.contato.nome);
    
    const navigate = useNavigate();
    const handleInputChange = (
      e:
        | React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >
        | SelectChangeEvent,
      section: "contato" | "funcionario",
      field: string,
      subfield?: string
    ) => {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]:
            subfield && section === "contato" && field === "endereco"
              ? {
                  ...prevData.contato.endereco,
                  [subfield]: e.target.value,
                }
              : e.target.value,
        },
      }));
    };
  
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        apiRequest.post("/employees", formData);
        gerarPDF(formData);
        handleUpload(e);
        setLoading(false);
        navigate("/employees");
      } catch (error) {
        console.error(error);
      }
    };
    
   return {
        steps,
        stepsText,
        currentStep,
        setCurrentStep,
        formData,
        loading,
        handleInputChange,
        handleSubmit,
        };  
}

export default useFormWizard;