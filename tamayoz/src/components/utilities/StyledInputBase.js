import { InputBase } from "@mui/material";
import styled from "styled-components";
const StyledInputBase = styled(InputBase)(() => ({
    width: "100%",
    maxWidth:"250px",
    minWidth:"230px",
    "& .MuiInputBase-input": {
      width:"100%",
      border: "2px solid var(--primary-color)",
      borderRadius: "5px",
      padding: "7px",
      display: `${(props) =>
      props.variant === "flex" ? "flex" : ""}`,
      transition: "box-shadow .5s",
      background: "#fff",
      "&:focus": {
        borderColor: "var(--secondary-color)",
        boxShadow: "0 0 0 1px var(--secondary-color)",
      },
    },
  }));
export default StyledInputBase
