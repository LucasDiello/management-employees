import React, { useState } from "react";
import "./addemployee.css";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { storage } from "../../libs/firebaseConfig";
import useFileUpload from "../../hooks/useFileUpload";
import ProfileImageUpload from "./ProfileImageUpload";

const Step1Form = ({
  formData,
  handleInputChange,
  previewUrl,
  getInputProps,
}: {
  formData: any;
  handleInputChange: any;
  previewUrl: string | null;
  getInputProps: () => { [key: string]: any };
}) => {
  return (
    <>
      <h2>
        Preenchimento de Informações de Contato e Dados Pessoais
        <EditIcon sx={{ color: "#555E68", fontSize: "20px" }} />
      </h2>
      <div className="form-step1">
        <div className="form-input-group1">
          <div className="content-input-group1">
            <label>
              <TextField
                value={formData.contato.nome}
                onChange={(e) => handleInputChange(e, "contato", "nome")}
                sx={{
                  marginBottom: "0.3rem",
                }}
                id="filled-basic"
                label="Nome"
                variant="filled"
                className="input"
              />
              Ex: João da Silva
            </label>
            <label>
              <TextField
                value={formData.contato.email}
                onChange={(e) => handleInputChange(e, "contato", "email")}
                sx={{ marginBottom: "0.3rem" }}
                id="filled-basic"
                label="Email"
                variant="filled"
                className="input"
              />
              Ex: joao.silva@email.com
            </label>
          </div>
          <ProfileImageUpload
            previewUrl={previewUrl}
            getInputProps={getInputProps}
          />
        </div>
        <div className="form-input-group2">
          <label>
            <TextField
              value={formData.contato.cpf}
              onChange={(e) => handleInputChange(e, "contato", "cpf")}
              sx={{ marginBottom: "0.3rem" }}
              id="filled-basic"
              label="Cpf"
              variant="filled"
              className="input"
            />
            Ex: 123.456.789-00
          </label>
          <label>
            <TextField
              value={formData.contato.rg}
              onChange={(e) => handleInputChange(e, "contato", "rg")}
              sx={{ marginBottom: "0.3rem" }}
              id="filled-basic"
              label="RG"
              variant="filled"
              className="input"
            />
            Ex: 123456789
          </label>
          <div className="sex">
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{ fontSize: "0.7rem" }}
              >
                Genêro
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Masc."
                name="radio-buttons-group"
                value={formData.contato.sexo}
                onChange={(e) => handleInputChange(e, "contato", "sexo")}
              >
                <FormControlLabel
                  value="Masculino"
                  control={<Radio sx={{ transform: "scale(0.8)" }} />}
                  label="Masc."
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.7rem",
                    },
                  }}
                />
                <FormControlLabel
                  value="Feminino"
                  control={<Radio sx={{ transform: "scale(0.8)" }} />}
                  label="Fem."
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.7rem",
                    },
                  }}
                />
                <FormControlLabel
                  value="outros"
                  control={<Radio sx={{ transform: "scale(0.8)" }} />}
                  label="Outros"
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
        <div className="form-input-group3">
          <label>
            <TextField
              value={formData.contato.endereco.rua}
              onChange={(e) =>
                handleInputChange(e, "contato", "endereco", "rua")
              }
              sx={{ marginBottom: "0.3rem" }}
              id="filled-basic"
              label="Rua"
              variant="filled"
              className="input"
            />
            Ex: Rua das Flores
          </label>
          <label>
            <TextField
              value={formData.contato.endereco.numero}
              onChange={(e) =>
                handleInputChange(e, "contato", "endereco", "numero")
              }
              sx={{ marginBottom: "0.3rem" }}
              id="filled-basic"
              label="Número"
              variant="filled"
              className="input"
            />
            Ex: 123
          </label>
          <label>
            <TextField
              value={formData.contato.endereco.bairro}
              onChange={(e) =>
                handleInputChange(e, "contato", "endereco", "bairro")
              }
              sx={{ marginBottom: "0.3rem" }}
              id="filled-basic"
              label="Bairro"
              variant="filled"
              className="input"
            />
            Ex: Centro
          </label>
        </div>
        <label>
          <TextField
            value={formData.contato.endereco.cidade}
            onChange={(e) =>
              handleInputChange(e, "contato", "endereco", "cidade")
            }
            sx={{ marginBottom: "0.3rem" }}
            id="filled-basic"
            label="Cidade"
            variant="filled"
            className="input"
          />
          Ex: São Paulo
        </label>
        <label>
          <TextField
            value={formData.contato.endereco.estado}
            onChange={(e) =>
              handleInputChange(e, "contato", "endereco", "estado")
            }
            sx={{ marginBottom: "0.3rem" }}
            id="filled-basic"
            label="Estado"
            variant="filled"
            className="input"
          />
          Ex: SP
        </label>
        <label>
          <TextField
            value={formData.contato.endereco.cep}
            onChange={(e) => handleInputChange(e, "contato", "endereco", "cep")}
            sx={{ marginBottom: "0.3rem" }}
            id="filled-basic"
            label="CEP"
            variant="filled"
            className="input"
          />
          Ex: 12345-678
        </label>
        <div className="form-input-group4">
          <label>
            <TextField
              value={formData.contato.telefone}
              onChange={(e) => handleInputChange(e, "contato", "telefone")}
              sx={{ marginBottom: "0.3rem" }}
              id="filled-basic"
              label="Telefone"
              variant="filled"
              className="input"
            />
            Ex: (11) 91234-5678
          </label>
          <label>
            <TextField
              type="date"
              value={formData.contato.dataAniversario}
              onChange={(e) =>
                handleInputChange(e, "contato", "dataAniversario")
              }
              sx={{ marginBottom: "0.3rem" }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              id="filled-basic"
              label="Data de Aniversário"
              variant="filled"
              className="input"
            />
            Ex: 1990-01-01
          </label>
        </div>
      </div>
    </>
  );
};

export default Step1Form;
