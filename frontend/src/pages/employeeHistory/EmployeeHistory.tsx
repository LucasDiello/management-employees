import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FormData } from "../../types";
import Header from "../../components/header/Header";
import dayjs from "dayjs";
import "./employeeHistory.css";
import { FaInfoCircle } from "react-icons/fa";

// Função para comparar dados
const compareValues = (value1: string | number, value2: string | number) => {
  return value1 !== value2 ? "highlight-difference" : "";
};

const EmployeeHistory = () => {
  const { data, currentData } = useLoaderData() as {
    data: FormData[];
    currentData: FormData;
  };

  const [selectedDate, setSelectedDate] = useState(
    data[0]?.dataAlteracao || ""
  );

  const selectedChanges = data.filter(
    (item) => item.dataAlteracao === selectedDate
  );

  const labels = [
    "Nome",
    "E-mail",
    "Sexo",
    "CPF",
    "RG",
    "Telefone",
    "Data de Aniversário",
    "Endereço",
    "Status",
    "Cargo",
    "Data de Admissão",
    "Setor",
    "Salário",
  ];

  const tableData = [
    currentData.contato.nome,
    currentData.contato.email,
    currentData.contato.sexo,
    currentData.contato.cpf,
    currentData.contato.rg,
    currentData.contato.telefone,
    dayjs(currentData.contato.dataAniversario).format("DD/MM/YYYY"),
    `${currentData.contato.endereco.rua}, ${currentData.contato.endereco.numero}, ${currentData.contato.endereco.bairro}, ${currentData.contato.endereco.cidade}, ${currentData.contato.endereco.estado}, ${currentData.contato.endereco.cep}`,
    currentData.funcionario.status,
    currentData.funcionario.cargo,
    currentData.funcionario.dataAdmissao,
    currentData.funcionario.setor,
    currentData.funcionario.salario,
  ];

  const alteredData = selectedChanges.map((change) => {
    return [
      change.contato.nome,
      change.contato.email,
      change.contato.sexo,
      change.contato.cpf,
      change.contato.rg,
      change.contato.telefone,
      dayjs(change.contato.dataAniversario).format("DD/MM/YYYY"),
      `${change.contato.endereco.rua}, ${change.contato.endereco.numero}, ${change.contato.endereco.bairro}, ${change.contato.endereco.cidade}, ${change.contato.endereco.estado}, ${change.contato.endereco.cep}`,
      change.funcionario.status,
      change.funcionario.cargo,
      change.funcionario.dataAdmissao,
      change.funcionario.setor,
      change.funcionario.salario,
    ];
  });

  return (
    <div className="employee-history layout">
      <Header />
      <h2>Histórico de Alterações</h2>
      <label htmlFor="date-select">Escolha uma data:</label>
      <select
        id="date-select"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        {data.map((item, index) => (
          <option key={index} value={item.dataAlteracao}>
            {dayjs(item.dataAlteracao).format("DD/MM/YYYY")} -{" "}
            {dayjs(item.dataAlteracao).format("HH:mm:ss")}
          </option>
        ))}
      </select>

      <section className="grid-container">
        <div>
          <h3>Última Atualização</h3>
          {data.length ? (
            alteredData.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className={`grid-cell ${compareValues(
                      value,
                      tableData[colIndex]
                    )}`}
                  >
                    <strong>{labels[colIndex]}:</strong> {value}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div
              className="
            no-changes
"
            >
              <p>Não há alterações.</p>
              <FaInfoCircle />
            </div>
          )}
        </div>

        <div>
          <h3>Dados Atuais</h3>
          <div className="grid-row">
            {tableData.map((data, index) => (
              <div key={index} className="grid-cell">
                <strong>{labels[index]}:</strong> {data}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeHistory;
