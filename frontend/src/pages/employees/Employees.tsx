// @ts-nocheck
import { useState, useEffect } from "react";
import React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { apiRequest } from "../../libs/apiRequest";
import { getComparator, Order } from "../../utils";
import RowMenu from "./RowMenu";
import { ButtonBase, CircularProgress } from "@mui/material";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../libs/firebaseConfig";
import { FormData } from "../../types";
import gerarPDF from "../../temp/gerarPDF";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

type Status = "Contratado" | "Refunded" | "Demitido";

const statusToDecorator: Record<Status, JSX.Element> = {
  Contratado: <CheckRoundedIcon />,
  Refunded: <AutorenewRoundedIcon />,
  Demitido: <BlockIcon />,
};

const statusToColor: Record<Status, "success" | "neutral" | "danger"> = {
  Contratado: "success",
  Refunded: "neutral",
  Demitido: "danger",
};
export default function OrderTable() {
  const [order, setOrder] = useState<Order>("desc");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await apiRequest("/employees");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [data]);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrar por status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="Contratado">Contratado</Option>
          <Option value="cancelled">Demitido</Option>
          <Option value="Análise">Análise</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Funcionários</FormLabel>
        <Select size="sm" placeholder="todos">
          <Option value="todos">Todos</Option>
          {data.map((row: any) => (
            <Option key={row.id} value={row.contato.nome}>
              {row.contato.nome}
            </Option>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );

  // Função para mudar de página
  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) =>
      direction === "next" ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  const handleDownloadPDF = async (formData: FormData) => {
    try {
      // Cria uma referência para a pasta onde os PDFs estão armazenados
      console.log(formData);
      gerarPDF(formData, true);
    } catch (error) {
      console.error(error);
    }
  };

  // Calcular os itens que devem ser exibidos na tabela
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = (data || []).slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calcule o total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Gere um array com os números de página
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Buscar"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar por funcionário</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== data.length
                  }
                  checked={selected.length === data.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? data.map((row: any) => row.id) : []
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === data.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: "lg",
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    },
                    order === "desc"
                      ? { "& svg": { transform: "rotate(0deg)" } }
                      : { "& svg": { transform: "rotate(180deg)" } },
                  ]}
                >
                  Inverter
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Data Admissão</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Funcionário</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Cargo</th>
              <th style={{ width: 140, padding: "12px 6px" }}> </th>
            </tr>
          </thead>
          <tbody>
            {[...currentItems].sort(getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "primary" : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id)
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {dayjs(row.funcionario.dataAdmissao).format("DD-MM-YYYY")}
                  </Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      statusToDecorator[row.funcionario.status as Status]
                    }
                    color={statusToColor[row.funcionario.status as Status]}
                  >
                    {row.funcionario.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm">
                      {row.contato.nome.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Typography level="body-xs">
                        {row.contato.nome}
                      </Typography>
                      <Typography level="body-xs">
                        {row.contato.email}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Typography level="body-xs">
                    {row.funcionario.cargo}
                  </Typography>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <ButtonBase
                      level="body-xs"
                      component="button"
                      onClick={() => handleDownloadPDF(row)}
                      sx={{ color: "blue" }}
                    >
                      Download
                    </ButtonBase>
                    <RowMenu row={row} />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      {currentItems.length === 0 && (
        <>
          <Typography level="body-xs" sx={{ textAlign: "center", mt: 2 }}>
            Nenhum funcionário encontrado
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              size="sm"
              variant="outlined"
              color="primary"
              onClick={() => navigate("/employees/add")}
            >
              Adicionar funcionário
            </Button>
          </Box>
        </>
      )}
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Box sx={{ flex: 1 }} />
        {pages.map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={currentPage === page ? "solid" : "outlined"}
            color="neutral"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
          onClick={() => handlePageChange("next")}
          disabled={currentPage * itemsPerPage >= data.length}
        >
          Próximo
        </Button>
      </Box>
    </React.Fragment>
  );
}
