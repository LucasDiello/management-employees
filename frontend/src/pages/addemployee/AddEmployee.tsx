import React, { useEffect, useState } from "react";
import MenuHeader from "../../components/header/MenuHeader";
import "./addemployee.css";
import { storage } from "../../libs/firebaseConfig";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import userDefault from "./userDefault.jpg";
import useFileUpload from "../../hooks/useFileUpload";
import ProfileImageUpload from "./ProfileImageUpload";
import Step1Form from "./Step1Form";
import { useFormWizard } from "../../hooks/useFormWizard";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const {
    steps,
    stepsText,
    currentStep,
    setCurrentStep,
    formData,
    handleInputChange,
    handleSubmit,
    idEmployee,
    errors,
  } = useFormWizard();
  const navigate = useNavigate();

  const { previewUrl, getInputProps } = useFileUpload(storage, idEmployee);

  useEffect(() => {
    if (idEmployee) {
      navigate(`/`);
    }
  }, [idEmployee]);

  const loadingWidth =
    currentStep === 0 ? "33%" : currentStep === 1 ? "66%" : "100%";

  return (
    <div>
      <header className="header-form-employees ">
        <div className="content-header">
          <div>
            <div>
              <h1>Taugor</h1>
              <p>Simplesmente Dinâmico</p>
            </div>
            <div>
              <p>
                passo {currentStep + 1} de {steps.length}
              </p>
              <p>
                {currentStep >= 0 && currentStep < stepsText.length
                  ? stepsText[currentStep][currentStep]
                  : ""}
              </p>
            </div>
          </div>
          <div>
            <MenuHeader />
          </div>
        </div>
        <div className="steps-loading">
          <div
            style={{
              width: loadingWidth,
              transition: "width 0.5s",
              backgroundColor: "lightblue",
              height: "7px",
            }}
          />
        </div>
      </header>
      <section className="layout-form-add-employees">
        <div className="title-infos">
          <h1>
            {" "}
            {currentStep >= 0 && currentStep < stepsText.length
              ? stepsText[currentStep][currentStep]
              : ""}
          </h1>
          {currentStep === 2 ? (
            <p>Confirme os dados abaixo antes de finalizar o cadastro.</p>
          ) : (
            <p>Preencha os campos abaixo com os dados que deseja adicionar.</p>
          )}
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            if (errors) {
              setCurrentStep(currentStep - 2);
            }
          }}
        >
          {currentStep === 0 && (
            <Step1Form
              formData={formData}
              handleInputChange={handleInputChange}
              previewUrl={previewUrl}
              getInputProps={getInputProps}
              errors={errors}
            />
          )}

          {currentStep === 1 && (
            <Step2Form
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && <Step3Form formData={formData} />}
          <div className="buttons">
            <button
              type="button"
              className="btn-previous"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <ArrowBackIcon sx={{ fontSize: 18, color: "#5bb9f4" }} />
              Anterior
            </button>
            {currentStep === 2 && (
              <button type="submit" className="btn-next">
                Finalizar
              </button>
            )}
            <button
              type="button"
              className="btn-next"
              disabled={currentStep === 2}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Próximo
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddEmployee;
