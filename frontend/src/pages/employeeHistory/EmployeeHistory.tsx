import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FormData } from "../../types";
import Header from "../../components/header/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./employeeHistory.css";
import UpdateIcon from "@mui/icons-material/Update";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";

// Função para comparar dados
const compareValues = (value1: string | number, value2: string | number) => {
  console.log(value1, value2);
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

  const tableData = [
    currentData.contato.nome,
    currentData.contato.email,
    currentData.contato.sexo,
    currentData.contato.cpf,
    currentData.contato.rg,
    currentData.contato.telefone,
    currentData.contato.dataAniversario,
    `${currentData.contato.endereco.rua}, ${currentData.contato.endereco.numero}, ${currentData.contato.endereco.bairro}, ${currentData.contato.endereco.cidade}, ${currentData.contato.endereco.estado}, ${currentData.contato.endereco.cep}`,
    currentData.funcionario.status,
    currentData.funcionario.cargo,
    currentData.funcionario.dataAdmissao,
    currentData.funcionario.setor,
    currentData.funcionario.salario,
  ];

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

      <section>
        <div>
          {data.length ? (
            <>
              <h3>
                Última Atualização <AccessTimeIcon />
              </h3>
              <TableContainer>
                <Table
                  sx={{ minWidth: 650 }}
                  aria-label="tabela de histórico de alterações"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email Anterior</TableCell>
                      <TableCell>Sexo</TableCell>
                      <TableCell>CPF</TableCell>
                      <TableCell>RG</TableCell>
                      <TableCell>Telefone Anterior</TableCell>
                      <TableCell>Data de Aniversário</TableCell>
                      <TableCell>Endereço</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Cargo</TableCell>
                      <TableCell>Data de Admissão</TableCell>
                      <TableCell>Setor</TableCell>
                      <TableCell>Salário</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedChanges.map((change, index) => {
                      const rowData = [
                        change.contato.nome,
                        change.contato.email,
                        change.contato.sexo,
                        change.contato.cpf,
                        change.contato.rg,
                        change.contato.telefone,
                        change.contato.dataAniversario,
                        `${change.contato.endereco.rua}, ${change.contato.endereco.numero}, ${change.contato.endereco.bairro}, ${change.contato.endereco.cidade}, ${change.contato.endereco.estado}, ${change.contato.endereco.cep}`,
                        change.funcionario.status,
                        change.funcionario.cargo,
                        change.funcionario.dataAdmissao,
                        change.funcionario.setor,
                        change.funcionario.salario,
                      ];

                      return (
                        <TableRow key={index}>
                          {rowData.map((data, cellIndex) => {
                            const highlightClass = compareValues(
                              data,
                              tableData[cellIndex]
                            );
                            return (
                              <TableCell
                                key={cellIndex}
                                sx={{
                                  fontSize: "0.6rem",
                                  width: "200px",
                                  height: "70px",
                                  padding: "0.5rem",
                                  fontWeight: highlightClass
                                    ? "bold"
                                    : "normal",
                                  color: highlightClass ? "red" : "black",
                                  borderBottom: highlightClass
                                    ? "1px solid red"
                                    : "none",
                                }}
                                size="small"
                              >
                                {data}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <h3>Não há alterações</h3>
          )}
        </div>

        <div>
          <h3>
            Dados Atuais <UpdateIcon />
          </h3>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="tabela de dados atuais">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email Atual</TableCell>
                  <TableCell>Sexo</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>RG</TableCell>
                  <TableCell>Telefone Atual</TableCell>
                  <TableCell>Data de Aniversário</TableCell>
                  <TableCell>Endereço</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Data de Admissão</TableCell>
                  <TableCell>Setor</TableCell>
                  <TableCell>Salário</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {tableData.map((data, index) => {
                    return (
                      <TableCell
                        key={index}
                        sx={{
                          fontSize: "0.6rem",
                          width: "200px",
                          height: "70px",
                          padding: "0.5rem",
                        }}
                        size="small"
                      >
                        {data}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </div>
  );
};

export default EmployeeHistory;
