import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  contato: {
    nome: String,
    email: String,
    sexo: String,
    endereco: {
      rua: String,
      numero: String,
      bairro: String,
      cidade: String,
      estado: String,
      cep: String,
    },
    telefone: String,
    fotoPerfil: String,
    dataAniversario: String,
  },
  funcionario: {
    status: String,
    cargo: String,
    dataAdmissao: String,
    setor: String,
    salario: Number,
  },
});

export default mongoose.model("Employee", EmployeeSchema);
