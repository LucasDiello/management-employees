import React, { useEffect, useState } from "react";
import "./addemployee.css";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfileImageUpload from "./ProfileImageUpload";
import axios from "axios";

const Step1Form = ({
  formData,
  handleInputChange,
  previewUrl,
  getInputProps,
  errors,
}: {
  formData: any;
  handleInputChange: any;
  previewUrl: string | null;
  getInputProps: () => { [key: string]: any };
  errors: { [key: string]: string };
}) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState(
    formData.contato.endereco.estado || ""
  );

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar estados:", error);
      });
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      axios
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
        )
        .then((response) => {
          setCities(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar cidades:", error);
        });
    }
  }, [estadoSelecionado]);
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
                error={!!errors["contato.nome"]}
                helperText={errors["contato.nome"]}
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
                error={!!errors["contato.email"]}
                helperText={errors["contato.email"]}
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
              error={!!errors["contato.cpf"]}
              helperText={errors["contato.cpf"]}
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
                  value="Outros"
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
              error={!!errors["contato.endereco.rua"]}
              helperText={errors["contato.endereco.rua"]}
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
              error={!!errors["contato.endereco.numero"]}
              helperText={errors["contato.endereco.numero"]}
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
              error={!!errors["contato.endereco.bairro"]}
              helperText={errors["contato.endereco.bairro"]}
            />
            Ex: Centro
          </label>
        </div>
        <FormControl
          variant="filled"
          sx={{
            display: "block",
            marginBottom: "0.3rem",
          }}
          error={!!errors["contato.endereco.estado"]}
        >
          <InputLabel id="demo-simple-select-filled-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={formData.contato.endereco.estado}
            onChange={(e: SelectChangeEvent) => {
              setEstadoSelecionado(e.target.value);
              handleInputChange(e, "contato", "endereco", "estado");
            }}
            sx={{
              display: "block",
            }}
          >
            <MenuItem value="">
              <em>Estado</em>
            </MenuItem>
            {states.map((state: any) => (
              <MenuItem key={state.id} value={state.sigla}>
                {state.nome}
              </MenuItem>
            ))}
          </Select>
          {errors["contato.endereco.estado"] && (
            <FormHelperText>{errors["contato.endereco.estado"]}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          variant="filled"
          sx={{
            display: "block",
            marginBottom: "0.3rem",
          }}
          error={!!errors["contato.endereco.cidade"]}
        >
          <InputLabel id="demo-simple-select-filled-label">Cidade</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={formData.contato.endereco.cidade}
            onChange={(e: SelectChangeEvent) =>
              handleInputChange(e, "contato", "endereco", "cidade")
            }
            sx={{
              display: "block",
            }}
          >
            <MenuItem value="">
              <em>Cidade</em>
            </MenuItem>
            {cities.map((city: any) => (
              <MenuItem key={city.id} value={city.nome}>
                {city.nome}
              </MenuItem>
            ))}
          </Select>
          {errors["contato.endereco.cidade"] && (
            <FormHelperText>{errors["contato.endereco.cidade"]}</FormHelperText>
          )}
        </FormControl>
        <label>
          <TextField
            value={formData.contato.endereco.cep}
            onChange={(e) => handleInputChange(e, "contato", "endereco", "cep")}
            sx={{ marginBottom: "0.3rem" }}
            id="filled-basic"
            label="CEP"
            variant="filled"
            className="input"
            error={!!errors["contato.endereco.cep"]}
            helperText={errors["contato.endereco.cep"]}
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
              error={!!errors["contato.telefone"]}
              helperText={errors["contato.telefone"]}
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
              error={!!errors["contato.dataAniversario"]}
            />
            Ex: 01/01/1990
          </label>
        </div>
      </div>
    </>
  );
};

export default Step1Form;
