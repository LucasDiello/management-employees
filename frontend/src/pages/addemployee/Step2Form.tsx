import React, { useState } from "react";
import "./addemployee.css";
import {
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const Step2Form = ({
  formData,
  handleInputChange,
}: {
  formData: any;
  handleInputChange: any;
}) => {
  return (
    <>
      <h2>Informações do Funcionário</h2>
      <div className="form-step2">
        <label>
          <FormControl
            variant="filled"
            sx={{
              display: "block",
              marginBottom: "0.3rem",
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={formData.funcionario.status}
              onChange={(e: SelectChangeEvent) =>
                handleInputChange(e, "funcionario", "status")
              }
              sx={{
                display: "block",
              }}
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              <MenuItem value="Contratado">Contratado</MenuItem>
              <MenuItem value="Demitido">Demitido</MenuItem>
            </Select>
          </FormControl>
          Ex: Empregado
        </label>
        <label>
          <FormControl
            variant="filled"
            sx={{
              display: "block",
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">Cargo</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={formData.funcionario.cargo}
              onChange={(e: SelectChangeEvent) =>
                handleInputChange(e, "funcionario", "cargo")
              }
              sx={{
                display: "block",
                marginBottom: "0.3rem",
              }}
            >
              <MenuItem value="">
                <em>Cargo</em>
              </MenuItem>
              <MenuItem value="Desenvolvedor">Desenvolvedor</MenuItem>
              <MenuItem value="Gerente">Gerente</MenuItem>
              <MenuItem value="Analista">Analista</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
          </FormControl>
          Ex: Desenvolvedor
        </label>
        <label>
          <TextField
            type="date"
            value={formData.funcionario.dataAdmissao}
            onChange={(e) =>
              handleInputChange(e, "funcionario", "dataAdmissao")
            }
            sx={{ marginBottom: "0.3rem" }}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            id="filled-basic"
            label="Data de Admissão"
            variant="filled"
            className="input"
          />
          Ex: 1990-01-01
        </label>
        <label>
          <FormControl
            variant="filled"
            sx={{
              display: "block",
              marginBottom: "0.3rem",
            }}
          >
            <InputLabel id="demo-simple-select-filled-label">Setor</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={formData.funcionario.setor}
              onChange={(e: SelectChangeEvent) =>
                handleInputChange(e, "funcionario", "setor")
              }
              sx={{
                display: "block",
              }}
            >
              <MenuItem value="">
                <em>Setor</em>
              </MenuItem>
              <MenuItem value="Financeiro">Financeiro</MenuItem>
              <MenuItem value="Tecnologia">Tecnologia</MenuItem>
              <MenuItem value="Administrativo">Administrativo</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
          </FormControl>
          Ex: Financeiro
        </label>
        <label>
          <TextField
            type="number"
            value={formData.funcionario.salario}
            onChange={(e) => handleInputChange(e, "funcionario", "salario")}
            sx={{ marginBottom: "0.3rem" }}
            id="filled-basic"
            label="Salário"
            variant="filled"
            className="input"
          />
          Ex: 1000.00
        </label>
      </div>
    </>
  );
};

export default Step2Form;
