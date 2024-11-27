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
  beneficios: {
    valeRefeicao: string;
    valeTransporte: boolean;
    planoSaude: boolean;
    auxilioHomeOffice: boolean;
    auxilioCreche: boolean;
  };
}

export interface FormData {
  contato: Contato;
  funcionario: Funcionario;
  dataAlteracao?: string;
  id?: string;
}

export type HandleInputChangeType = (
  e: any,
  section: "contato" | "funcionario",
  field: string,
  subfield?: string
) => void;

export type Order = "asc" | "desc";
