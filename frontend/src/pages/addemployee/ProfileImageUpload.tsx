import React, { useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import userDefault from "./userDefault.jpg";

const ProfileImageUpload = ({
  previewUrl,
  getInputProps,
}: {
  previewUrl: string | null;
  getInputProps: () => { [key: string]: any };
}) => {
  const [isRounded, setIsRounded] = useState(false);

  return (
    <div className="profile-image">
      <input {...getInputProps()} />
      <div>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className={isRounded ? "rounded" : ""}
          />
        ) : (
          <img
            src={userDefault}
            alt="User Default"
            className={isRounded ? "rounded" : ""}
          />
        )}
      </div>
      <div>
        <h2>Foto do perfil</h2>
        <div className="btn-photo">
          <button
            onClick={(e) => {
              e.preventDefault();
              const fileInput = document.querySelector('input[type="file"]');
              if (fileInput) {
                (fileInput as HTMLInputElement).click();
              }
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: 14, color: "white" }} />
          </button>
          <p>Adicionar foto</p>
        </div>
        <div className="checkbox-rounded">
          <FormControlLabel
            control={
              <Switch
                onChange={() => setIsRounded(!isRounded)}
                color="primary"
              />
            }
            labelPlacement="end"
            label="Foto redonda"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.7rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
