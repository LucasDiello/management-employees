import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { FormData } from "../../types";

const RenderFilters = ({
  data,
  setStatus,
  setSelectedEmployee,
}: {
  data: FormData[];
  setStatus: Function;
  setSelectedEmployee: Function;
}) => (
  <React.Fragment>
    <FormControl size="sm">
      <FormLabel>Status</FormLabel>
      <Select
        size="sm"
        placeholder="Filtrar por status"
        slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        onChange={(e, values) => {
          setStatus(values);
        }}
      >
        <Option value="">Todos</Option>
        <Option value="Contratado">Contratado</Option>
        <Option value="Demitido">Demitido</Option>
        <Option value="Análise">Análise</Option>
      </Select>
    </FormControl>
    <FormControl size="sm">
      <FormLabel>Funcionários</FormLabel>
      <Select
        size="sm"
        placeholder="todos"
        onChange={(e, values) => {
          setSelectedEmployee(values);
        }}
      >
        <Option value="todos">Todos</Option>
        {data.map((row: FormData) => (
          <Option key={row.id} value={row.contato.nome}>
            {row.contato.nome}
          </Option>
        ))}
      </Select>
    </FormControl>
  </React.Fragment>
);

export default RenderFilters;
