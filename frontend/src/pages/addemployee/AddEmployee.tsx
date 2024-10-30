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
  const steps = ["1", "2"];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    contato: {
      nome: "",
      email: "",
      sexo: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
  const [isRounded, setIsRounded] = useState(false); // Estado para controlar o arredondamento da imagem
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setFile(file);
    console.log(file);
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

  return (
    <div className="layout">
      <header>
        <div>
          <h1>Taugor</h1>
          <p>Simplesmente Dinâmico</p>
        </div>
        <div>
          <MenuHeader />
        </div>
      </header>
      <section>
        <div>
          <h1>Informações sobre o funcionário.</h1>
          <p>
            Preencha os campos abaixo com as informações do funcionário que
            deseja adicionar.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div>
              <h2>Informações de Contato</h2>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={formData.contato.nome}
                  onChange={(e) => handleInputChange(e, "contato", "nome")}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.contato.email}
                  onChange={(e) => handleInputChange(e, "contato", "email")}
                />
              </div>
              <div>
                <div>
                  <h2>Foto do perfil</h2>
                  <div>
                    <input {...getInputProps()} />
                    <div>
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            margin: "10px",
                          }}
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
                        document.querySelector(
                          'input[type="file"]'
                        ) as HTMLInputElement
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
              </div>

              <select
                value={formData.contato.sexo}
                onChange={(e) => handleInputChange(e, "contato", "sexo")}
              >
                <option value="">Selecione o Sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
              <input
                type="text"
                placeholder="Rua"
                value={formData.contato.endereco.rua}
                onChange={(e) =>
                  handleInputChange(e, "contato", "endereco", "rua")
                }
              />
              <input
                type="text"
                placeholder="Número"
                value={formData.contato.endereco.numero}
                onChange={(e) =>
                  handleInputChange(e, "contato", "endereco", "numero")
                }
              />
              <input
                type="text"
                placeholder="Bairro"
                value={formData.contato.endereco.bairro}
                onChange={(e) =>
                  handleInputChange(e, "contato", "endereco", "bairro")
                }
              />
              <input
                type="text"
                placeholder="Cidade"
                value={formData.contato.endereco.cidade}
                onChange={(e) =>
                  handleInputChange(e, "contato", "endereco", "cidade")
                }
              />
              <input
                type="text"
                placeholder="Estado"
                value={formData.contato.endereco.estado}
                onChange={(e) =>
                  handleInputChange(e, "contato", "endereco", "estado")
                }
              />
              <input
                type="text"
                placeholder="CEP"
                value={formData.contato.endereco.cep}
                onChange={(e) =>
                  handleInputChange(e, "contato", "endereco", "cep")
                }
              />
              <input
                type="text"
                placeholder="Telefone"
                value={formData.contato.telefone}
                onChange={(e) => handleInputChange(e, "contato", "telefone")}
              />
              <input
                type="text"
                placeholder="Foto de Perfil"
                value={formData.contato.fotoPerfil}
                onChange={(e) => handleInputChange(e, "contato", "fotoPerfil")}
              />
              <input
                type="date"
                placeholder="Data de Aniversário"
                value={formData.contato.dataAniversario}
                onChange={(e) =>
                  handleInputChange(e, "contato", "dataAniversario")
                }
              />
            </div>
          )}

          {currentStep === 1 && (
            <div>
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
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Anterior
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
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
