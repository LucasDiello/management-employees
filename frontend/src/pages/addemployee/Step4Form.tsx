import dayjs from "dayjs";
import React from "react";
import { FormData } from "../../types";

const Step4Form = ({ formData }: { formData: FormData }) => {
  return (
    <>
      <div className="form-step3">
        <h4>Informações de Contato</h4>
        <p>Nome: {formData.contato.nome}</p>
        <p>Email: {formData.contato.email}</p>
        <p>CPF: {formData.contato.cpf}</p>
        <p>RG: {formData.contato.rg}</p>
        <p>Sexo: {formData.contato.sexo}</p>
        <p>Rua: {formData.contato.endereco.rua}</p>
        <p>Número: {formData.contato.endereco.numero}</p>
        <p>Bairro: {formData.contato.endereco.bairro}</p>
        <p>Cidade: {formData.contato.endereco.cidade}</p>
        <p>Estado: {formData.contato.endereco.estado}</p>
        <p>CEP: {formData.contato.endereco.cep}</p>
        <p>Telefone: {formData.contato.telefone}</p>
        <p>
          Data de Aniversário:{" "}
          {dayjs(formData.contato.dataAniversario).format("DD-MM-YYYY")}
        </p>
        <h4>Informações do Funcionário</h4>
        <p>Status: {formData.funcionario.status}</p>
        <p>Cargo: {formData.funcionario.cargo}</p>
        <p>
          Data de Admissão:{" "}
          {dayjs(formData.funcionario.dataAdmissao).format("DD-MM-YYYY")}
        </p>
        <p>Setor: {formData.funcionario.setor}</p>
        <p>Salário: {formData.funcionario.salario}</p>
        <h4>
          Benefícios:{" "}
          {formData.funcionario.beneficios.valeRefeicao ? "Vale Refeição " : ""}
          {formData.funcionario.beneficios.valeTransporte
            ? "Vale Transporte"
            : ""}
          {formData.funcionario.beneficios.planoSaude ? "Plano de Saúde " : ""}
          {formData.funcionario.beneficios.auxilioHomeOffice
            ? "Auxílio Home Office "
            : ""}
          {formData.funcionario.beneficios.auxilioCreche
            ? "Auxílio Creche "
            : ""}
        </h4>
      </div>
    </>
  );
};

export default Step4Form;
