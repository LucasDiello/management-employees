import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Menu from "@mui/joy/Menu";

import { Divider, Dropdown, IconButton } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

function RowMenu({ row }: { row: any }) {
  const navigate = useNavigate();
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: { variant: "plain", color: "neutral", size: "sm" },
        }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem
          onClick={() => {
            navigate(`/employees/update/${row.id}`);
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate(`/employee/history/${row.id}`);
          }}
        >
          Histórico
        </MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default RowMenu;
