import React, { useState } from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const CollapsableListItem = ({
  children,
  setSelectedIndex,
  name,
  drawerOpen,
  icon,
  index,
  subsection,
  active,
}) => {
  let [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
    setSelectedIndex(index);
  };
  return (
    <>
      <ListItemButton selected={active} onClick={handleClick} key={name}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          primary={name}
          color={subsection ? (open ? "var(--primary-color)" : "") : ""}
          sx={{ "& span": { fontSize: subsection ? 13 : "" } }}
        />
        {open ? (
          <ArrowDropDownIcon
            sx={{
              color: open ? "var(--secondary-color)" : "#4B7CF3",
            }}
          />
        ) : (
          <ArrowRightIcon
            sx={{
              color: open ? "var(--secondary-color)" : "#4B7CF3",
            }}
          />
        )}
      </ListItemButton>
      <Collapse in={drawerOpen && open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};
export default CollapsableListItem;
