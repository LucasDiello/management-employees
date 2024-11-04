import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import MenuHeader from "../../components/header/MenuHeader";
import "../addemployee/addemployee.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { apiRequest } from "../../libs/apiRequest";
import { useFormWizard } from "../../hooks/useFormWizard";
import { FormData } from "../../types";
import Step1Form from "../addemployee/Step1Form";
import Step2Form from "../addemployee/Step2Form";
import Step3Form from "../addemployee/Step3Form";
import useFileUpload from "../../hooks/useFileUpload";
import { storage } from "../../libs/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

const UpdateEmployee = () => {
  const data = useLoaderData() as FormData;
  const [previewUrlUpdated, setPreviewUrlUpdated] = useState<string | null>(
    null
  );
  console.log(data);
  const {
    steps,
    stepsText,
    currentStep,
    setCurrentStep,
    formData,
    loading,
    handleInputChange,
    handleSubmit,
    errors,
  } = useFormWizard(data);

  const navigate = useNavigate();

  useEffect(() => {
    const imageRef = ref(storage, `images/${data.id}/profile.jpg`);
    getDownloadURL(imageRef)
      .then((url) => {
        setPreviewUrlUpdated(url);
      })
      .catch((error) => {
        console.error("Erro ao obter URL da imagem:", error);
        setPreviewUrlUpdated("url-da-imagem-placeholder");
      });
  }, []);

  const { previewUrl, getInputProps } = useFileUpload(storage, data.id || "");

  if (loading) {
    return <h1>Carregando...</h1>;
  }
  console.log(previewUrlUpdated, "previewUrl");
  return (
    <div>
      <header className="header-form-employees">
        <div className="content-header">
          <div>
            <h1>Editar Funcionário</h1>
            <p>Atualize os dados do funcionário abaixo</p>
          </div>
          <div>
            <MenuHeader />
          </div>
        </div>
        <div className="steps-loading">
          <div
            style={{
              width: `${(currentStep + 1) * (100 / steps.length)}%`,
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
            navigate("/employees");
          }}
        >
          {currentStep === 0 && (
            <Step1Form
              formData={formData}
              handleInputChange={handleInputChange}
              previewUrl={previewUrl || previewUrlUpdated}
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

export default UpdateEmployee;
