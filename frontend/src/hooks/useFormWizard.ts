import { useState } from "react";
import { FormData } from "../types";
import gerarPDF from "../temp/gerarPDF";
import { apiRequest } from "../libs/apiRequest";
import { formDataSchema } from "../schema/formDataSchema";
import { z } from "zod";

export const useFormWizard = (initialData : FormData | null = null) => {
    
    const stepsText: { [key: string]: string }[] = [
      { "0": "Informações de Contato" },
      { "1": "Informações do Funcionário" },
      { "2": "Informações dos Benefícios" },
      { "3": "Conclusão" },
    ];
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>(
      initialData || {
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
          beneficios: {
            valeRefeicao: "",
            valeTransporte: false,
            planoSaude: false,
            auxilioHomeOffice: false,
            auxilioCreche: false,
          }
        },
      }
    );
    const [idEmployee, setIdEmployee] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (
      e:
        | React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          > 
         ,
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
                  [subfield]: e.target.value ,
                }
              : subfield && section === "funcionario" && field === "beneficios" 
              ? {
                  ...prevData.funcionario.beneficios,
                  [subfield]: e.target.value,
                }
              : e.target.value,
        },
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        formDataSchema.parse(formData);
        if (initialData) {
          const { data } = await apiRequest.put(`/employees/${initialData.id}`, formData);
          gerarPDF(data, false);
          
        } else {
          const {data} = await apiRequest.post("/employees", formData);
         setIdEmployee(data.id);
         gerarPDF(data, false);
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors: { [key: string]: string } = {};
            error.errors.forEach((err) => {
              formattedErrors[err.path.join('.')] = err.message;
            });
            setErrors(formattedErrors); 
          }
        console.error(error);
      }
      finally {
        setLoading(false);
        }
    };
  
    return {
      idEmployee,
      stepsText,
      currentStep,
      setCurrentStep,
      formData,
      loading,
      handleInputChange,
      handleSubmit,
        errors
      };
  };
  