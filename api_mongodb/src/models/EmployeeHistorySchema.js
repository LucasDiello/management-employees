import mongoose from "mongoose";

const EmployeeHistorySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  contato: {
    nome: String,
    email: String,
    sexo: String,
    cpf: String,
    rg: String,
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
  dataAlteracao: { type: Date, default: Date.now },
});

export default mongoose.model("EmployeeHistory", EmployeeHistorySchema);
