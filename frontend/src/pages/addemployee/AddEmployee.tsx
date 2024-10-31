import React, { useState } from "react";
import MenuHeader from "../../components/header/MenuHeader";
import "./addemployee.css";
import { useDropzone } from "react-dropzone";
import userDefault from "./userDefault.jpg";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../libs/firebaseConfig";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

interface Contato {
  nome: string;
  email: string;
  sexo: string;
  cpf: string;
  rg: string;
  endereco: Endereco;
  telefone: string;
  fotoPerfil: string;
  dataAniversario: string;
}

interface Funcionario {
  status: string;
  cargo: string;
  dataAdmissao: string;
  setor: string;
  salario: string;
}

interface FormData {
  contato: Contato;
  funcionario: Funcionario;
}

const AddEmployee: React.FC = () => {
  const steps = ["1", "2", "3"];
  const stepsText: { [key: string]: string }[] = [
    { "0": "Informações de Contato" },
    { "1": "Informações do Funcionário" },
    { "2": "Finalizar" },
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRounded, setIsRounded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setFile(file);
  };

  const { getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: true,
  });

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const storageRef = ref(
      storage,
      `images/${formData.contato.nome}/profile.jpg`
    );
    const uploadTask = uploadBytesResumable(storageRef, file as Blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
        alert("Erro ao fazer upload da imagem");
      }
    );
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    handleUpload(e);
  };

  const loadingWidth =
    currentStep === 0 ? "33%" : currentStep === 1 ? "66%" : "100%";

  return (
    <div>
      <header className="header-form-employees">
        <div className="content-header">
          <div>
            <div>
              <h1>Taugor</h1>
              <p>Simplesmente Dinâmico</p>
            </div>
            <div>
              <p>
                passo {currentStep + 1} de {steps.length}
              </p>
              <p>
                {currentStep >= 0 && currentStep < stepsText.length
                  ? stepsText[currentStep][currentStep]
                  : ""}
              </p>
            </div>
          </div>
          <div>
            <MenuHeader />
          </div>
        </div>
        <div className="steps-loading">
          <div
            style={{
              width: loadingWidth,
              transition: "width 0.5s",
              backgroundColor: "lightblue",
              height: "7px",
            }}
          />
        </div>
      </header>
      <section className="layout-form-add-employees">
        <div className="title-infos">
          <h1>
            {" "}
            {currentStep >= 0 && currentStep < stepsText.length
              ? stepsText[currentStep][currentStep]
              : ""}
          </h1>
          <p>Preencha os campos abaixo com os dados que deseja adicionar.</p>
        </div>
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className="form-step1">
              <h2>
                Preenchimento de Informações de Contato e Dados Pessoais
                <EditIcon sx={{ color: "#555E68", fontSize: "20px" }} />
              </h2>
              <div className="form-input-group1">
                <div className="content-input-group1">
                  <label>
                    <TextField
                      value={formData.contato.nome}
                      onChange={(e) => handleInputChange(e, "contato", "nome")}
                      sx={{
                        marginBottom: "0.3rem",
                      }}
                      id="filled-basic"
                      label="Nome"
                      variant="filled"
                      className="input"
                    />
                    Ex: João da Silva
                  </label>
                  <label>
                    <TextField
                      value={formData.contato.email}
                      onChange={(e) => handleInputChange(e, "contato", "email")}
                      sx={{ marginBottom: "0.3rem" }}
                      id="filled-basic"
                      label="Email"
                      variant="filled"
                      className="input"
                    />
                    Ex: joao.silva@email.com
                  </label>
                </div>
                <div className="profile-image">
                  <input {...getInputProps()} />
                  <div>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className={isRounded ? "rounded" : ""}
                      />
                    ) : (
                      <img
                        src={userDefault}
                        alt="User Default"
                        className={isRounded ? "rounded" : ""}
                      />
                    )}
                  </div>
                  <div>
                    <h2>Foto do perfil</h2>
                    <div className="btn-photo">
                      <button
                        onClick={() =>
                          (
                            document.querySelector(
                              'input[type="file"]'
                            ) as HTMLInputElement
                          )?.click()
                        }
                      >
                        <ArrowUpwardIcon
                          sx={{ fontSize: 14, color: "white" }}
                        />
                      </button>
                      <p>Adicionar foto</p>
                    </div>
                    <div className="checkbox-rounded">
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={() => setIsRounded(!isRounded)}
                            color="primary"
                          />
                        }
                        labelPlacement="end"
                        label={"Foto redonda"}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.7rem",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-input-group2">
                <label>
                  <TextField
                    value={formData.contato.cpf}
                    onChange={(e) => handleInputChange(e, "contato", "cpf")}
                    sx={{ marginBottom: "0.3rem" }}
                    id="filled-basic"
                    label="Cpf"
                    variant="filled"
                    className="input"
                  />
                  Ex: 123.456.789-00
                </label>
                <label>
                  <TextField
                    value={formData.contato.rg}
                    onChange={(e) => handleInputChange(e, "contato", "rg")}
                    sx={{ marginBottom: "0.3rem" }}
                    id="filled-basic"
                    label="RG"
                    variant="filled"
                    className="input"
                  />
                  Ex: 123456789
                </label>
                <div className="sex">
                  <FormControl>
                    <FormLabel
                      id="demo-radio-buttons-group-label"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      Genêro
                    </FormLabel>
                    <RadioGroup
                      row // Adicione esta propriedade para alinhar os itens em linha
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio sx={{ transform: "scale(0.8)" }} />}
                        label="Female"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.7rem",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio sx={{ transform: "scale(0.8)" }} />}
                        label="Male"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.7rem",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio sx={{ transform: "scale(0.8)" }} />}
                        label="Other"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.7rem",
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="form-input-group3">
                <label>
                  <TextField
                    value={formData.contato.endereco.rua}
                    onChange={(e) =>
                      handleInputChange(e, "contato", "endereco", "rua")
                    }
                    sx={{ marginBottom: "0.3rem" }}
                    id="filled-basic"
                    label="Rua"
                    variant="filled"
                    className="input"
                  />
                  Ex: Rua das Flores
                </label>
                <label>
                  <TextField
                    value={formData.contato.endereco.numero}
                    onChange={(e) =>
                      handleInputChange(e, "contato", "endereco", "numero")
                    }
                    sx={{ marginBottom: "0.3rem" }}
                    id="filled-basic"
                    label="Número"
                    variant="filled"
                    className="input"
                  />
                  Ex: 123
                </label>
                <label>
                  <TextField
                    value={formData.contato.endereco.bairro}
                    onChange={(e) =>
                      handleInputChange(e, "contato", "endereco", "bairro")
                    }
                    sx={{ marginBottom: "0.3rem" }}
                    id="filled-basic"
                    label="Bairro"
                    variant="filled"
                    className="input"
                  />
                  Ex: Centro
                </label>
              </div>
              <label>
                <TextField
                  value={formData.contato.endereco.cidade}
                  onChange={(e) =>
                    handleInputChange(e, "contato", "endereco", "cidade")
                  }
                  sx={{ marginBottom: "0.3rem" }}
                  id="filled-basic"
                  label="Cidade"
                  variant="filled"
                  className="input"
                />
                Ex: São Paulo
              </label>
              <label>
                <TextField
                  value={formData.contato.endereco.estado}
                  onChange={(e) =>
                    handleInputChange(e, "contato", "endereco", "estado")
                  }
                  sx={{ marginBottom: "0.3rem" }}
                  id="filled-basic"
                  label="Estado"
                  variant="filled"
                  className="input"
                />
                Ex: SP
              </label>
              <label>
                <TextField
                  value={formData.contato.endereco.cep}
                  onChange={(e) =>
                    handleInputChange(e, "contato", "endereco", "cep")
                  }
                  sx={{ marginBottom: "0.3rem" }}
                  id="filled-basic"
                  label="CEP"
                  variant="filled"
                  className="input"
                />
                Ex: 12345-678
              </label>
              <div className="form-input-group4">
                <label>
                  <TextField
                    value={formData.contato.telefone}
                    onChange={(e) =>
                      handleInputChange(e, "contato", "telefone")
                    }
                    sx={{ marginBottom: "0.3rem" }}
                    id="filled-basic"
                    label="Telefone"
                    variant="filled"
                    className="input"
                  />
                  Ex: (11) 91234-5678
                </label>
                <label>
                  <TextField
                    type="date"
                    value={formData.contato.dataAniversario}
                    onChange={(e) =>
                      handleInputChange(e, "contato", "dataAniversario")
                    }
                    sx={{ marginBottom: "0.3rem" }}
                    slotProps={{
                      inputLabel: { shrink: true }, // Mantém o rótulo no topo
                    }}
                    id="filled-basic"
                    label="Data de Aniversário"
                    variant="filled"
                    className="input"
                  />
                  Ex: 1990-01-01
                </label>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="form-step2">
              <h2>Informações do Funcionário</h2>
              <select
                value={formData.funcionario.status}
                onChange={(e) => handleInputChange(e, "funcionario", "status")}
              >
                <option value="">Selecione o Status</option>
                <option value="Contratado">Contratado</option>
                <option value="Demitido">Demitido</option>
              </select>
              <select
                value={formData.funcionario.cargo}
                onChange={(e) => handleInputChange(e, "funcionario", "cargo")}
              >
                <option value="">Selecione o Cargo</option>
                <option value="Desenvolvedor">Desenvolvedor</option>
                <option value="Gerente">Gerente</option>
                <option value="Analista">Analista</option>
                <option value="Outro">Outro</option>
              </select>
              <input
                type="date"
                placeholder="Data de Admissão"
                value={formData.funcionario.dataAdmissao}
                onChange={(e) =>
                  handleInputChange(e, "funcionario", "dataAdmissao")
                }
              />
              <select
                value={formData.funcionario.setor}
                onChange={(e) => handleInputChange(e, "funcionario", "setor")}
              >
                <option value="">Selecione o Setor</option>
                <option value="Desenvolvedor">Desenvolvedor</option>
                <option value="Tech">Tech Lead</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Outro">Outro</option>
              </select>
              <input
                type="number"
                placeholder="Salário"
                value={formData.funcionario.salario}
                onChange={(e) => handleInputChange(e, "funcionario", "salario")}
              />
            </div>
          )}

          <div className="buttons">
            <button
              type="button"
              className="btn-previous"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <ArrowBackIcon sx={{ fontSize: 18, color: "#5bb9f4" }} />
              Anterior
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                className="btn-next"
                disabled={currentStep === steps.length - 1}
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Próximo
              </button>
            ) : (
              <button type="submit">Enviar</button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddEmployee;
