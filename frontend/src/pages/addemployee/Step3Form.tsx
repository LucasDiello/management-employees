import React, { useState } from "react";
import "./addemployee.css";
import {
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { FormLabel } from "@mui/joy";
import { FormData, HandleInputChangeType } from "../../types";

const Step3Form = ({
  formData,
  handleInputChange,
  errors,
}: {
  formData: FormData;
  handleInputChange: HandleInputChangeType;
  errors: { [key: string]: string };
}) => {
  return (
    <>
      <div className="form-input-group2">
        <label>
          <TextField
            type="number"
            value={formData.funcionario.beneficios.valeRefeicao}
            onChange={(e) =>
              handleInputChange(e, "funcionario", "beneficios", "valeRefeicao")
            }
            sx={{ marginBottom: "0.3rem" }}
            id="filled-basic"
            label="Vale Refeição"
            variant="filled"
            className="input"
            error={!!errors["funcionario.salario"]} // corrigir erro
          />
          Ex: 1000.00
        </label>
        <div className="sex">
          <FormControl>
            <FormLabel id="plano-saude-label" sx={{ fontSize: "0.7rem" }}>
              Plano de Saúde
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="plano-saude-label"
              defaultValue={false}
              name="radio-buttons-group"
              value={formData.funcionario.beneficios.planoSaude}
              onChange={(e) =>
                handleInputChange(
                  {
                    ...e,
                    target: {
                      ...e.target,
                      value: e.target.value === "true",
                    } as any,
                  },
                  "funcionario",
                  "beneficios",
                  "planoSaude"
                )
              }
            >
              <FormControlLabel
                value={true}
                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                label="Sim"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.7rem",
                  },
                }}
              />
              <FormControlLabel
                value={false}
                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                label="Não"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.7rem",
                  },
                }}
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="plano-saude-label" sx={{ fontSize: "0.7rem" }}>
              Auxílio creche
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="plano-saude-label"
              defaultValue={false}
              name="radio-buttons-group"
              value={formData.funcionario.beneficios.auxilioCreche}
              onChange={(e) =>
                handleInputChange(
                  {
                    ...e,
                    target: {
                      ...e.target,
                      value: e.target.value === "true",
                    } as any,
                  },
                  "funcionario",
                  "beneficios",
                  "auxilioCreche"
                )
              }
            >
              <FormControlLabel
                value={true}
                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                label="Sim"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.7rem",
                  },
                }}
              />
              <FormControlLabel
                value={false}
                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                label="Não"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.7rem",
                  },
                }}
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="plano-saude-label" sx={{ fontSize: "0.7rem" }}>
              Vale Transporte
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="plano-saude-label"
              defaultValue={false}
              name="radio-buttons-group"
              value={formData.funcionario.beneficios.valeTransporte}
              onChange={(e) =>
                handleInputChange(
                  {
                    ...e,
                    target: {
                      ...e.target,
                      value: e.target.value === "true",
                    } as any,
                  },
                  "funcionario",
                  "beneficios",
                  "valeTransporte"
                )
              }
            >
              <FormControlLabel
                value={true}
                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                label="Sim"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.7rem",
                  },
                }}
              />
              <FormControlLabel
                value={false}
                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                label="Não"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.7rem",
                  },
                }}
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="plano-saude-label" sx={{ fontSize: "0.7rem" }}>
              Auxílio Home Office
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="plano-saude-label"
              defaultValue={false}
              name="radio-buttons-group"
              value={formData.funcionario.beneficios.auxilioHomeOffice}
              onChange={(e) =>
                handleInputChange(
                  {
                    ...e,
                    target: {
                      ...e.target,
                      value: e.target.value === "true",
                    } as any,
                  },
                  "funcionario",
                  "beneficios",
                  "auxilioHomeOffice"
                )
              }
            >
              <FormControlLabel
                value={true}
                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                label="Sim"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.7rem",
                  },
                }}
              />
              <FormControlLabel
                value={false}
                control={<Radio sx={{ transform: "scale(0.8)" }} />}
                label="Não"
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
    </>
  );
};

export default Step3Form;
