import React, { useEffect, useState } from "react";
import MenuHeader from "../../components/header/MenuHeader";
import "./addemployee.css";
import { storage } from "../../libs/firebaseConfig";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Step2Form from "./Step2Form";
import useFileUpload from "../../hooks/useFileUpload";
import Step1Form from "./Step1Form";
import { useFormWizard } from "../../hooks/useFormWizard";
import { useNavigate } from "react-router-dom";
import Step4Form from "./Step4Form";
import Step3Form from "./Step3Form";

const AddEmployee = () => {
  const {
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
    currentStep === 0
      ? "25%"
      : currentStep === 1
      ? "50%"
      : currentStep === 2
      ? "75%"
      : "100%";
  return (
    <div>
      <header className="header-form-employees ">
        <div className="content-header">
          <div>
            <div>
              <h1>TechNova</h1>
              <p>Simplesmente Dinâmico</p>
            </div>
            <div>
              <p>
                passo {currentStep + 1} de {stepsText.length}
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
          {currentStep === 2 && (
            <Step3Form
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}
          {currentStep === 3 && <Step4Form formData={formData} />}
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
            {currentStep === 3 && (
              <button type="submit" className="btn-next">
                Finalizar
              </button>
            )}
            <button
              type="button"
              className="btn-next"
              disabled={currentStep === 3}
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
