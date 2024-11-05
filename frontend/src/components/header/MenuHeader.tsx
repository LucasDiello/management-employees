import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../libs/firebaseConfig";
import { useAuth } from "../../context/authContext";

const ITEM_HEIGHT = 48;

export default function MenuHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { currentUser } = useAuth();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/");
          }}
        >
          Funcionários
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/employees/add");
          }}
        >
          Adicionar Funcionário
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {currentUser ? `Sair` : "Login"}
        </MenuItem>
      </Menu>
    </div>
  );
}
