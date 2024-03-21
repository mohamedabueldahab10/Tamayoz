import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import CollapsableListItem from "./CollapsableListItem";
import { useTranslation } from "react-i18next";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  top: "70px",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function Sidebar(props) {
  const { t } = useTranslation("layout");
  const [open, setOpen] = useState(false);
  const [disableFunctions, setDisableFunctions] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const location = useLocation().pathname;
  const { setCurrentWidth } = props;
  const { i18n } = useTranslation();
  const { language } = i18n;
  const handleHoverOn = () => setOpen(true);
  const handleHoverOff = () => setOpen(false);
  const handleToggleNavbar = () => {
    setCurrentWidth(!open ? "260px" : "73px");
    setOpen(!open);
    setDisableFunctions((disableFunctions) => !disableFunctions);
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 25,
          left: language === "ar" ? "auto" : "23px",
          right: language === "ar" ? "28px" : "auto",
          zIndex: "101",
          fontSize: "30px",
          cursor: "pointer",
        }}
        onClick={handleToggleNavbar}
      >
        <FontAwesomeIcon
          icon="bars"
          color={open ? "var(--primary-color)" : "#0f4b56"}
          size="xs"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          position: disableFunctions ? "relative" : "fixed",
          zIndex: "3",
        }}
        onMouseEnter={!disableFunctions ? handleHoverOn : null}
        onMouseLeave={!disableFunctions ? handleHoverOff : null}
      >
        <Drawer
          variant="permanent"
          dir="ltr"
          anchor={language === "ar" ? "right" : "left"}
          open={open}
        >
          <List
            sx={{
              "& > a , & > div": { left: "7px" },
              top: "85px",
              maxHeight: "calc(100vh - 85px)",
              overflowX: "hidden",
              "&::scrollbar": {
                width: "5px",
              },
              scrollbarWidth: "thin",
              overflowY: "auto",
            }}
            onClick={() => setOpen(true)}
          >
            <ListItemButton
              selected={selectedIndex === "Home"}
              onClick={() => setSelectedIndex("Home")}
              key="Home"
              sx={{
                "& span ": {
                  color:
                    selectedIndex === "Home" || location === "/"
                      ? "var(--primary-color)"
                      : "currentColor",
                },
              }}
              component={NavLink}
              to="/"
            >
              <ListItemIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M14.5,7.345,6.722,13.567v8.71h5.556V17.833h4.444v4.444h5.556V14.1a1.111,1.111,0,0,0-.417-.867Zm0-2.845,8.749,7A3.333,3.333,0,0,1,24.5,14.1v8.176A2.222,2.222,0,0,1,22.278,24.5H6.722A2.222,2.222,0,0,1,4.5,22.278v-8.71a2.222,2.222,0,0,1,.833-1.734Z"
                    transform="translate(-4.5 -4.5)"
                    fill={
                      selectedIndex === "Home" || location === "/"
                        ? "var(--primary-color)"
                        : "#0f4b56"
                    }
                  />
                </svg>
              </ListItemIcon>
              <ListItemText primary={`${t("home_section.home")}`} />
            </ListItemButton>
            <CollapsableListItem
              drawerOpen={open}
              active={
                selectedIndex === "Operation" || location.includes("operations")
              }
              setSelectedIndex={setSelectedIndex}
              index={"Operation"}
              name={`${t("operation_section.operation")}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 23.977 23"
                >
                  <g transform="translate(0 -6.063)">
                    <path
                      d="M62.149,54.552a7.6,7.6,0,1,0,7.6,7.6A7.6,7.6,0,0,0,62.149,54.552Zm-2.772,9.125a.42.42,0,0,1-.419.42h-.292a.417.417,0,0,1-.366-.216l-.742-1.339a15.026,15.026,0,0,1-.7-1.423l-.018.006c.024.532.037,1.1.037,1.758v.795a.418.418,0,1,1-.836,0V60.485a.418.418,0,0,1,.417-.419h.4a.42.42,0,0,1,.365.213l.716,1.263a11.692,11.692,0,0,1,.657,1.381h.019a14.767,14.767,0,0,1-.078-1.679v-.759a.419.419,0,1,1,.838,0v3.192Zm2.988.42H60.541a.374.374,0,0,1-.373-.374V60.44a.374.374,0,0,1,.373-.374h1.74a.374.374,0,0,1,0,.748h-1.1a.1.1,0,0,0-.1.1v.64a.1.1,0,0,0,.1.1H62.2a.37.37,0,0,1,.369.37.374.374,0,0,1-.373.374H61.18a.1.1,0,0,0-.1.1v.761a.1.1,0,0,0,.1.1h1.185a.375.375,0,0,1,0,.75Zm5.656-3.861a.439.439,0,0,1,.079.378l-.78,3.019a.617.617,0,0,1-1.2-.035l-.244-1.237c-.078-.407-.143-.784-.19-1.244h-.013c-.071.456-.137.837-.233,1.244L65.161,63.6a.626.626,0,0,1-1.221.01l-.706-2.977a.464.464,0,0,1,.451-.572.466.466,0,0,1,.458.381l.234,1.282c.091.478.174,1,.24,1.406h.012c.065-.439.161-.921.263-1.419l.244-1.18a.589.589,0,0,1,1.156.009l.232,1.22c.091.472.156.9.216,1.352h.012c.06-.449.15-.922.233-1.4l.259-1.3a.439.439,0,0,1,.777-.184Z"
                      transform="translate(-50.16 -44.585)"
                      fill={
                        selectedIndex === "Operation" ||
                        location.includes("operations") === "Operation"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                    <path
                      d="M23.424,16.179l-1.26-1.325a1.316,1.316,0,0,1-.351-1.08l.24-1.812a2.009,2.009,0,0,0-1.628-2.24l-1.8-.331a1.316,1.316,0,0,1-.919-.667l-.871-1.607a2.009,2.009,0,0,0-2.633-.856l-1.649.789a1.316,1.316,0,0,1-1.136,0L9.771,6.26a2.009,2.009,0,0,0-2.633.856L6.267,8.723a1.316,1.316,0,0,1-.919.667l-1.8.331a2.009,2.009,0,0,0-1.628,2.24l.241,1.812a1.317,1.317,0,0,1-.351,1.08L.553,16.179a2.009,2.009,0,0,0,0,2.769l1.26,1.325a1.316,1.316,0,0,1,.351,1.08l-.241,1.812A2.009,2.009,0,0,0,3.551,25.4l1.8.331a1.316,1.316,0,0,1,.919.667l.871,1.607a2.009,2.009,0,0,0,2.633.856l1.649-.789a1.316,1.316,0,0,1,1.136,0l1.649.789a2.009,2.009,0,0,0,2.633-.856l.871-1.607a1.316,1.316,0,0,1,.919-.667l1.8-.331a2.009,2.009,0,0,0,1.627-2.24l-.24-1.812a1.316,1.316,0,0,1,.351-1.08l1.26-1.325A2.009,2.009,0,0,0,23.424,16.179ZM11.988,26.751a9.188,9.188,0,1,1,9.188-9.188A9.188,9.188,0,0,1,11.988,26.751Z"
                      fill={
                        selectedIndex === "Operation" ||
                        location.includes("operations") === "Operation"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                  </g>
                </svg>
              }
            >
              <List sx={{ paddingInline: 2 }}>
                <ListItemButton
                  onClick={() => setSelectedIndex("New Shipment")}
                  key="New Shipment"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "New Shipment" ||
                        location === "/operations/shipment/new"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/shipment"
                >
                  <ListItemText
                    primary={`${t("operation_section.new_shipment")}`}
                  />
                </ListItemButton>
                <CollapsableListItem
                  drawerOpen={open}
                  subsection
                  active={selectedIndex === "Upload Excel"}
                  setSelectedIndex={setSelectedIndex}
                  index={"Upload Excel"}
                  name={`${t("operation_section.upload_excel")}`}
                >
                  <List sx={{ paddingInline: 2 }}>
                    <ListItemButton
                      onClick={() => setSelectedIndex("New File")}
                      key="New File"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "New File" ||
                            location === "/operations/upload/new"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="/operations/upload/new"
                    >
                      <ListItemText
                        primary={`${t("operation_section.new_file")}`}
                      />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => setSelectedIndex("Uploaded List")}
                      key="Uploaded List"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "Uploaded List"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="/operations/upload/list"
                    >
                      <ListItemText
                        primary={`${t("operation_section.upload_list")}`}
                      />
                    </ListItemButton>
                  </List>
                </CollapsableListItem>
                <ListItemButton
                  onClick={() => setSelectedIndex("Verify")}
                  key="Verify"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Verify" ||
                        location === "/operations/verify"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/verify"
                >
                  <ListItemText primary={`${t("operation_section.verify")}`} />
                </ListItemButton>
                <CollapsableListItem
                  drawerOpen={open}
                  subsection
                  active={selectedIndex === "Assign To Runner"}
                  setSelectedIndex={setSelectedIndex}
                  index={"Assign To Runner"}
                  name={`${t("operation_section.assign_runner")}`}
                >
                  <List sx={{ paddingInline: 2 }}>
                    <ListItemButton
                      onClick={() => setSelectedIndex("New DRS")}
                      key="New DRS"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "New DRS" ||
                            location === "/operations/assign/new"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="operations/assign/new"
                    >
                      <ListItemText
                        primary={`${t("operation_section.new_list")}`}
                      />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => setSelectedIndex("DRS List")}
                      key="DRS List"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "DRS List" ||
                            location === "/operations/assign/list"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="operations/assign/list"
                    >
                      <ListItemText
                        primary={`${t("operation_section.drs_list")}`}
                      />
                    </ListItemButton>
                  </List>
                </CollapsableListItem>
                <ListItemButton
                  onClick={() => setSelectedIndex("Runner Return")}
                  key="Runner Return"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Runner Return" ||
                        location === "/operations/runner"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/runner"
                >
                  <ListItemText
                    primary={`${t("operation_section.runner_return")}`}
                  />
                </ListItemButton>
                <CollapsableListItem
                  drawerOpen={open}
                  subsection
                  active={selectedIndex === "Return To Sender"}
                  setSelectedIndex={setSelectedIndex}
                  index={"Return To Sender"}
                  name={`${t("operation_section.return_to_sender")}`}
                >
                  <List sx={{ paddingInline: 2 }}>
                    <ListItemButton
                      onClick={() => setSelectedIndex("New Return")}
                      key="New Return"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "New Return" ||
                            location === "/operations/return/new"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="/operations/return/new"
                    >
                      <ListItemText
                        primary={`${t("operation_section.new_return")}`}
                      />
                    </ListItemButton>

                    <ListItemButton
                      onClick={() => setSelectedIndex("Returned List")}
                      key="Returned List"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "Returned List" ||
                            location === "/operations/return/list"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="/operations/return/list"
                    >
                      <ListItemText
                        primary={`${t("operation_section.return_list")}`}
                      />
                    </ListItemButton>
                  </List>
                </CollapsableListItem>
                <ListItemButton
                  onClick={() => setSelectedIndex("Change Status History")}
                  key="Change Status History"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Change Status History" ||
                        location === "/operations/change-history"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/change-history"
                >
                  <ListItemText
                    primary={`${t("operation_section.change_status_history")}`}
                  />
                </ListItemButton>
                <CollapsableListItem
                  drawerOpen={open}
                  subsection
                  active={selectedIndex === "Transaction Cell"}
                  setSelectedIndex={setSelectedIndex}
                  index={"Transaction Cell"}
                  name={`${t("operation_section.transaction_cell")}`}
                >
                  <List sx={{ paddingInline: 2 }}>
                    <ListItemButton
                      onClick={() => setSelectedIndex("New Transaction Cells")}
                      key="New Transaction Cells"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "New Transaction Cells" ||
                            location === "/operations/manage/cells"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="/operations/manage/cells"
                    >
                      <ListItemText
                        primary={`${t(
                          "operation_section.new_transaction_cell"
                        )}`}
                      />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => setSelectedIndex("Transaction Cell List")}
                      key="Transaction Cell List"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "Transaction Cell List" ||
                            location === "/operations/manage/cellsList"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="/operations/manage/cellsList"
                    >
                      <ListItemText
                        primary={`${t(
                          "operation_section.transaction_cell_list"
                        )}`}
                      />
                    </ListItemButton>
                  </List>
                </CollapsableListItem>
                <ListItemButton
                  onClick={() => setSelectedIndex("Lost Shipments")}
                  key="Lost Shipments"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Lost Shipments" ||
                        location === "/operations/shipment/lost"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/lost-shipments"
                >
                  <ListItemText
                    primary={`${t("operation_section.lost_shipment")}`}
                  />
                </ListItemButton>
                <CollapsableListItem
                  drawerOpen={open}
                  subsection
                  active={selectedIndex === "Visits Results"}
                  setSelectedIndex={setSelectedIndex}
                  index={"Visits Results"}
                  name={`${t("operation_section.visit_result")}`}
                >
                  <List sx={{ paddingInline: 2 }}>
                    <ListItemButton
                      onClick={() => setSelectedIndex("New Visits")}
                      key="New Visits"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "New Visits" ||
                            location === "/operations/vitit/new"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="operations/visit/new"
                    >
                      <ListItemText
                        primary={`${t("operation_section.new_visits")}`}
                      />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => setSelectedIndex("Visit Results List")}
                      key="Visit Results List"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "Visit Results List" ||
                            location === "/operations/vitit/list"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="operations/visit/list"
                    >
                      <ListItemText
                        primary={`${t("operation_section.visit_result_list")}`}
                      />
                    </ListItemButton>
                  </List>
                </CollapsableListItem>
                <Box
                  sx={{
                    position: "relative",
                    width: "90%",
                    height: "1px",
                    backgroundColor: "var(--primary-color)",
                    margin: "0 auto",
                  }}
                ></Box>
                <ListItemButton
                  onClick={() => setSelectedIndex("Manage Transaction")}
                  key="Manage Transaction"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Manage Transaction" ||
                        location === "/operations/manage/transactions"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/manage/transactions"
                >
                  <ListItemText
                    primary={`${t("operation_section.manage_transaction")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Manage AWBS")}
                  key="Manage AWBS"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Manage AWBS" ||
                        location === "/operations/manage/awbs"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/manage/awbs"
                >
                  <ListItemText
                    primary={`${t("operation_section.manage_awbs")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Reoperate Shipments")}
                  key="Reoperate Shipments"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Reoperate Shipments" ||
                        location === "/operations/reoperate"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/reoperate"
                >
                  <ListItemText
                    primary={`${t("operation_section.reoperate_shipment")}`}
                  />
                </ListItemButton>

                <CollapsableListItem
                  drawerOpen={open}
                  subsection
                  active={selectedIndex === "Consignment Status"}
                  setSelectedIndex={setSelectedIndex}
                  index={"Consignment Status"}
                  name={`${t("operation_section.consignment_status")}`}
                >
                  <List sx={{ paddingInline: 1 }}>
                    <ListItemButton
                      onClick={() => setSelectedIndex("Add Consignment Status")}
                      key="Add Consignment Status"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "Add Consignment Status" ||
                            location === "/operations/consignment/add"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="/operations/consignment/add"
                    >
                      <ListItemText
                        primary={`${t(
                          "operation_section.change_consignment_status"
                        )}`}
                      />
                    </ListItemButton>
                    <ListItemButton
                      onClick={() =>
                        setSelectedIndex("Consignment Status List")
                      }
                      key="Consignment Status List"
                      sx={{
                        "& span ": {
                          color:
                            selectedIndex === "Consignment Status List" ||
                            location === "/operations/consignment/list"
                              ? "var(--primary-color)"
                              : "currentColor",
                          fontSize: 13,
                        },
                      }}
                      component={NavLink}
                      to="/operations/consignment/list"
                    >
                      <ListItemText
                        primary={`${t(
                          "operation_section.consignment_status_list"
                        )}`}
                      />
                    </ListItemButton>
                  </List>
                </CollapsableListItem>

                <ListItemButton
                  onClick={() => setSelectedIndex("Update Consignee Data")}
                  key="Update Consignee Data"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Update Consignee Data" ||
                        location === "/operations/update-consignee-data"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/update-consignee"
                >
                  <ListItemText
                    primary={`${t("operation_section.update_consignee_data")}`}
                  />
                </ListItemButton>
              </List>
            </CollapsableListItem>
            <CollapsableListItem
              drawerOpen={open}
              active={selectedIndex === "report" || location.includes("report")}
              setSelectedIndex={setSelectedIndex}
              index={"report"}
              name={`${t("report_section.report")}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 21.75 26"
                >
                  <g transform="translate(-5.625 -2.25)">
                    <path
                      d="M11.25,20.25h9V22.5h-9Z"
                      transform="translate(-1.071 -3.385)"
                      fill={
                        selectedIndex === "report"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                    <path
                      d="M11.25,14.625h10.5v2.25H11.25Z"
                      transform="translate(0 -2.327)"
                      fill={
                        selectedIndex === "report"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                    <path
                      d="M11.25,25.875h5.625v2.25H11.25Z"
                      transform="translate(-0.882 -4.442)"
                      fill={
                        selectedIndex === "report"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                    <path
                      d="M25.4,5.036H22.432V4.107A1.92,1.92,0,0,0,20.455,2.25H12.545a1.92,1.92,0,0,0-1.977,1.857v.929H7.6A1.92,1.92,0,0,0,5.625,6.893v19.5A1.92,1.92,0,0,0,7.6,28.25H25.4a1.92,1.92,0,0,0,1.977-1.857V6.893A1.92,1.92,0,0,0,25.4,5.036ZM12.545,4.107h7.909V7.821H12.545ZM25.4,26.393H7.6V6.893h2.966V9.679H22.432V6.893H25.4Z"
                      fill={
                        selectedIndex === "report"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                  </g>
                </svg>
              }
            >
              <List sx={{ paddingInline: 2 }}>
                <ListItemButton
                  onClick={() => setSelectedIndex("Bulk Shipment")}
                  key="Bulk Shipment"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Bulk Shipment" ||
                        location === "/operations/bulk-shipments"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/operations/bulk-shipments"
                >
                  <ListItemText
                    primary={`${t("operation_section.bulk_shipment")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("AWB Status Tracking")}
                  key="AWB Status Tracking"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "AWB Status Tracking" ||
                        location === "/reports/awb-status-tracking"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/reports/awb-status-tracking"
                >
                  <ListItemText
                    primary={`${t("report_section.awb_status_tracking")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Data Entry Inquiry")}
                  key="Data Entry Inquiry"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Data Entry Inquiry" ||
                        location === "/reports/data-entry-inquiry"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/reports/data-entry-inquiry"
                >
                  <ListItemText
                    primary={`${t("report_section.data_entry_inquiry")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("AWB Edit History")}
                  key="AWB Edit History"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "AWB Edit History" ||
                        location === "/reports/awb-edit-history"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/reports/awb-edit-history"
                >
                  <ListItemText
                    primary={`${t("report_section.awb_edit_history")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Runner Activity Inquiry")}
                  key="Runner Activity Inquiry"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Runner Activity Inquiry" ||
                        location === "/reports/runner-activity-inquiry"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/reports/runner-activity-inquiry"
                >
                  <ListItemText
                    primary={`${t("report_section.runner_activity_inquiry")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Track Routes")}
                  key="Track Routes"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Track Routes" ||
                        location === "/reports/track-routes"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/reports/track-routes"
                >
                  <ListItemText
                    primary={`${t("report_section.track_routes")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Track Runners")}
                  key="Track Runners"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Track Runners" ||
                        location === "/reports/track-runners"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/reports/track-runners"
                >
                  <ListItemText
                    primary={`${t("report_section.track_runners")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Print Barcode")}
                  key="Print Barcode"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Print Barcode" ||
                        location === "/reports/print-code"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/reports/print-code"
                >
                  <ListItemText
                    primary={`${t("report_section.print_barcode")}`}
                  />
                </ListItemButton>
              </List>
            </CollapsableListItem>
            <CollapsableListItem
              drawerOpen={open}
              active={
                selectedIndex === "Finance" || location.includes("Finance")
              }
              setSelectedIndex={setSelectedIndex}
              index={"Finance"}
              name={`${t("finance_section.finance")}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 11.963 20"
                >
                  <path
                    d="M16.435,27.083V25.027H12.417V21.1h8.037V19.047H14.474a2.064,2.064,0,0,1-1.449-.561,1.828,1.828,0,0,1-.608-1.4V11.1a1.828,1.828,0,0,1,.608-1.4,2.064,2.064,0,0,1,1.449-.561h1.963V7.083h4.018V9.139H24.38v3.925H16.436v2.056h5.981a1.916,1.916,0,0,1,1.963,1.963v5.981a1.916,1.916,0,0,1-1.963,1.963H20.454v2.056H16.436Z"
                    transform="translate(-12.417 -7.083)"
                    fill={
                      selectedIndex === "Finance" ||
                      location.includes("finance") === "Finance"
                        ? "var(--secondary-color)"
                        : "#0f4b56"
                    }
                  />
                </svg>
              }
            >
              <List sx={{ paddingInline: 2 }}>
                <ListItemButton
                  onClick={() => setSelectedIndex("Clients")}
                  key="Clients"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Clients" ||
                        location === "/finance/Clients"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/finance/clients"
                >
                  <ListItemText primary={`${t("finance_section.clients")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Products")}
                  key="Products"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Products" ||
                        location === "/finance/products-definition"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/finance/products-definition"
                >
                  <ListItemText primary={`${t("finance_section.products")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Cash Collection")}
                  key="Cash Collection"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Cash Collection" ||
                        location === "/finance/cash-collection"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/finance/cash-collection"
                >
                  <ListItemText
                    primary={`${t("finance_section.cash_collection")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Pay To Customer")}
                  key="Pay To Customer"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Pay To Customer" ||
                        location === "/finance/paytocust"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/finance/paytocust"
                >
                  <ListItemText
                    primary={`${t("finance_section.pay_to_customer")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Define Services")}
                  key="Define Services"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Define Services" ||
                        location === "/finance/define-services"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/finance/define-services"
                >
                  <ListItemText
                    primary={`${t("finance_section.define_services")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Price Lists")}
                  key="Price Lists"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Price Lists" ||
                        location === "/finance/price-lists"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/finance/price-lists"
                >
                  <ListItemText
                    primary={`${t("finance_section.price_list")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Branch Payments")}
                  key="Branch Payments"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Branch Payments" ||
                        location === "/finance/branch-payments"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/finance/branch-payments"
                >
                  <ListItemText
                    primary={`${t("finance_section.branch_payments")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Customer Statement")}
                  key="Customer Statement"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Customer Statement" ||
                        location === "/finance/statements"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/finance/statements"
                >
                  <ListItemText
                    primary={`${t("finance_section.customer_statements")}`}
                  />
                </ListItemButton>
              </List>
            </CollapsableListItem>
            <CollapsableListItem
              drawerOpen={open}
              active={
                selectedIndex === "Branch Management" ||
                location.includes("branch-management")
              }
              setSelectedIndex={setSelectedIndex}
              index={"Branch Management"}
              name={`${t("branch_section.branch_management")}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 19.717 21.748"
                >
                  <path
                    d="M7.613,7.934v8.129a3.528,3.528,0,0,0-3.091,3.731,3.788,3.788,0,0,0,3.922,3.079,3.788,3.788,0,0,0,3.922-3.079,3.528,3.528,0,0,0-3.091-3.731V13.176h7.887a3.919,3.919,0,0,0,4.151-3.625V7.889a3.466,3.466,0,0,0,2.853-3.871A3.855,3.855,0,0,0,20.06,1.13a3.719,3.719,0,0,0-3.724,3.259,3.591,3.591,0,0,0,3.316,3.579V9.552a2.352,2.352,0,0,1-2.491,2.175H9.274V7.934A3.528,3.528,0,0,0,12.365,4.2,3.788,3.788,0,0,0,8.444,1.124,3.788,3.788,0,0,0,4.522,4.2,3.528,3.528,0,0,0,7.613,7.934ZM17.991,4.568a2.153,2.153,0,0,1,2.283-1.994,2.153,2.153,0,0,1,2.283,1.994,2.153,2.153,0,0,1-2.283,1.994A2.155,2.155,0,0,1,17.991,4.568Zm-7.264,14.86a2.153,2.153,0,0,1-2.283,1.994A2.153,2.153,0,0,1,6.16,19.428a2.153,2.153,0,0,1,2.283-1.994A2.155,2.155,0,0,1,10.727,19.428ZM8.444,2.574a2.153,2.153,0,0,1,2.283,1.994A2.153,2.153,0,0,1,8.444,6.562,2.153,2.153,0,0,1,6.16,4.568,2.155,2.155,0,0,1,8.444,2.574Z"
                    transform="translate(-4.5 -1.124)"
                    fill={
                      selectedIndex === "Branch Management" ||
                      location.includes("branch-management") ===
                        "Branch Management"
                        ? "var(--secondary-color)"
                        : "#0f4b56"
                    }
                  />
                </svg>
              }
            >
              <List sx={{ paddingInline: 2 }}>
                <ListItemButton
                  onClick={() => setSelectedIndex("Send Shipments To Branch")}
                  key="Send Shipments To Branch"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Send Shipments To Branch" ||
                        location === "/branch-management/send-shipments"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/branch-management/send-shipments"
                >
                  <ListItemText
                    primary={`${t("branch_section.send_shipments")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() =>
                    setSelectedIndex("Receive Shipments From Branch")
                  }
                  key="Receive Shipments From Branch"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Receive Shipments From Branch" ||
                        location === "/branch-management/receive-shipments"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/branch-management/receive-shipments"
                >
                  <ListItemText
                    primary={`${t("branch_section.receive-shipments")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Settle Transfer Process")}
                  key="Settle Transfer Process"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Settle Transfer Process" ||
                        location === "/branch-management/settle-process"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/branch-management/settle-process"
                >
                  <ListItemText
                    primary={`${t("branch_section.settle_transfer_process")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Shipment Transfer Inquiry")}
                  key="Shipment Transfer Inquiry"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Shipment Transfer Inquiry" ||
                        location ===
                          "/branch-management/shipment-transfer-inquiry"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/branch-management/shipment-transfer-inquiry"
                >
                  <ListItemText
                    primary={`${t("branch_section.shipment_inquiry")}`}
                  />
                </ListItemButton>
              </List>
            </CollapsableListItem>
            <CollapsableListItem
              drawerOpen={open}
              active={selectedIndex === "admin" || location.includes("admin")}
              setSelectedIndex={setSelectedIndex}
              index={"admin"}
              name={`${t("admin_section.admin")}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 14.286 20"
                >
                  <g transform="translate(-2.25 -2.25)">
                    <path
                      d="M10.625,3.679A3.572,3.572,0,1,1,7.054,7.25a3.572,3.572,0,0,1,3.572-3.572m0-1.429a5,5,0,1,0,5,5A5,5,0,0,0,10.625,2.25Z"
                      transform="translate(-1.232)"
                      fill={
                        selectedIndex === "admin"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                    <path
                      d="M16.536,28.822H15.107V25.25a3.572,3.572,0,0,0-3.572-3.572H7.25A3.572,3.572,0,0,0,3.679,25.25v3.572H2.25V25.25a5,5,0,0,1,5-5h4.286a5,5,0,0,1,5,5Z"
                      transform="translate(0 -6.571)"
                      fill={
                        selectedIndex === "admin"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                  </g>
                </svg>
              }
            >
              <List sx={{ paddingInline: 2 }}>
                <ListItemButton
                  onClick={() => setSelectedIndex("Company Data")}
                  key="Company Data"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Company Data" ||
                        location === "/admin/company-data"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/admin/company-data"
                >
                  <ListItemText
                    primary={`${t("admin_section.company_data")}`}
                  />
                </ListItemButton>

                <ListItemButton
                  onClick={() => setSelectedIndex("Branches")}
                  key="Branches"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Branches" ||
                        location === "/admin/branches"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/admin/branches"
                >
                  <ListItemText primary={`${t("admin_section.branches")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Employees")}
                  key="Employees"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Employees" ||
                        location === "/admin/employees"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/admin/employees"
                >
                  <ListItemText primary={`${t("admin_section.employees")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Allowed Devices")}
                  key="Allowed Devices"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Allowed Devices" ||
                        location === "/admin/allowed-devices"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/admin/allowed-devices"
                >
                  <ListItemText
                    primary={`${t("admin_section.allowed_devices")}`}
                  />
                </ListItemButton>
              </List>
            </CollapsableListItem>
            <CollapsableListItem
              drawerOpen={open}
              active={selectedIndex === "setup" || location.includes("setup")}
              setSelectedIndex={setSelectedIndex}
              index={"setup"}
              name={`${t("setup_section.setup")}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.088"
                  height="20"
                  viewBox="0 0 512 512"
                  fill={
                    selectedIndex === "setup"
                      ? "var(--secondary-color)"
                      : "#0f4b56"
                  }
                >
                  <path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z" />
                </svg>
              }
            >
              <List sx={{ paddingInline: 2 }}>
                <ListItemButton
                  onClick={() => setSelectedIndex("Status")}
                  key="Status"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Status" ||
                        location === "/setup/status"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/setup/status"
                >
                  <ListItemText primary={`${t("setup_section.status")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Reasons")}
                  key="Reasons"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Reasons" ||
                        location === "/setup/reasons"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/setup/reasons"
                >
                  <ListItemText primary={`${t("setup_section.reasons")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Recipient")}
                  key="Recipient"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Recipient" ||
                        location === "/setup/recipient"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/setup/recipient"
                >
                  <ListItemText primary={`${t("setup_section.recipient")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Zones")}
                  key="Zones"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Zones" || location === "/setup/zones"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/setup/zones"
                >
                  <ListItemText primary={`${t("setup_section.zones")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Cells")}
                  key="Cells"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Cells" || location === "/setup/cells"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/setup/cells"
                >
                  <ListItemText primary={`${t("setup_section.cells")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Message Template")}
                  key="Message Template"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Message Template" ||
                        location === "/setup/message-template"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/setup/message-template"
                >
                  <ListItemText
                    primary={`${t("setup_section.message_template")}`}
                  />
                </ListItemButton>
              </List>
            </CollapsableListItem>
            <CollapsableListItem
              drawerOpen={open}
              active={
                selectedIndex === "permissions" ||
                location.includes("permissions")
              }
              setSelectedIndex={setSelectedIndex}
              index={"permissions"}
              name={`${t("permissions_section.permissions")}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.088"
                  height="20"
                  viewBox="0 0 17.088 20"
                >
                  <g transform="translate(-4.5 -2.25)">
                    <path
                      d="M14.922,16.467l-2.378-2.05L11.25,15.532,14.922,18.7l7.343-6.333L20.971,11.25Z"
                      transform="translate(-3.713 -3.599)"
                      fill={
                        selectedIndex === "permissions" ||
                        location.includes("permissions") === "permissions"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                    <path
                      d="M13.044,22.25,8.647,19.9A7.848,7.848,0,0,1,4.5,12.964V3.679A1.428,1.428,0,0,1,5.924,2.25h14.24a1.428,1.428,0,0,1,1.424,1.429v9.286A7.848,7.848,0,0,1,17.441,19.9ZM5.924,3.679v9.286a6.421,6.421,0,0,0,3.394,5.673l3.726,1.994,3.726-1.993a6.421,6.421,0,0,0,3.394-5.674V3.679Z"
                      transform="translate(0)"
                      fill={
                        selectedIndex === "permissions" ||
                        location.includes("permissions") === "permissions"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    />
                  </g>
                </svg>
              }
            >
              <List sx={{ paddingInline: 2 }}>
                <ListItemButton
                  onClick={() => setSelectedIndex("Users")}
                  key="Users"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Users" ||
                        location === "/permissions/users"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/permissions/users"
                >
                  <ListItemText primary={`${t("admin_section.users")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Group Licenses")}
                  key="Group Licenses"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Group Licenses" ||
                        location === "/permissions/group-licenses"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/permissions/group-licenses"
                >
                  <ListItemText
                    primary={`${t("permissions_section.group_licenses")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Groups Definition")}
                  key="Groups Definition"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Groups Definition" ||
                        location === "/permissions/groups-definition"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/permissions/groups-definition"
                >
                  <ListItemText
                    primary={`${t("permissions_section.group_definition")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Change User Group")}
                  key="Change User Group"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Change User Group" ||
                        location === "/permissions/change-user-groups"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/permissions/change-user-groups"
                >
                  <ListItemText
                    primary={`${t("permissions_section.change_user_group")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Change Password")}
                  key="Change Password"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Change Password" ||
                        location === "/permissions/change-password"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/permissions/change-password"
                >
                  <ListItemText
                    primary={`${t("permissions_section.change_password")}`}
                  />
                </ListItemButton>
              </List>
            </CollapsableListItem>
            <CollapsableListItem
              drawerOpen={open}
              active={selectedIndex === "pickup" || location.includes("pickup")}
              setSelectedIndex={setSelectedIndex}
              index={"pickup"}
              name={`${t("pickup_section.pickup")}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <g transform="translate(-1 0)">
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m17.5 11c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm3.255 6.305-2.75 2.5c-.144.13-.324.195-.505.195s-.361-.065-.505-.195l-2.75-2.5c-.306-.279-.329-.753-.05-1.06.277-.307.752-.329 1.06-.051l2.245 2.042 2.245-2.042c.308-.278.781-.256 1.06.051s.256.781-.05 1.06z"
                      fill={
                        selectedIndex === "pickup"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    ></path>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m13.44 1.59-9.08 4.58-3.61-1.75 8.92-4.34c.2-.1.44-.1.65 0z"
                      fill={
                        selectedIndex === "pickup"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    ></path>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m19.25 4.42-9.24 4.51-3.46-1.68-.5-.25 9.09-4.58.5.25z"
                      fill={
                        selectedIndex === "pickup"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    ></path>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m9.26 15.4c-.17.67-.26 1.38-.26 2.1s.09 1.41.26 2.08v.14l-8.85-4.55c-.25-.13-.41-.39-.41-.67v-8.78l3.75 1.82v3.2c0 .41.34.75.75.75s.75-.34.75-.75v-2.46l.5.24 3.52 1.71z"
                      fill={
                        selectedIndex === "pickup"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    ></path>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="m20.01 9.38c-.79-.25-1.64-.38-2.51-.38-2.74 0-5.18 1.3-6.73 3.32v-2.1l9.23-4.49c.01.84.01 2.48.01 3.65z"
                      fill={
                        selectedIndex === "pickup"
                          ? "var(--secondary-color)"
                          : "#0f4b56"
                      }
                    ></path>
                  </g>
                </svg>
              }
            >
              <List sx={{ paddingInline: 2 }}>
                <ListItemButton
                  onClick={() => setSelectedIndex("New Pickup")}
                  key="New Pickup"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "New Pickup" ||
                        location === "/pickup/new-pickup"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/pickup/new-pickup"
                >
                  <ListItemText primary={`${t("pickup_section.new_pickup")}`} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Assign Pickup To Runner")}
                  key="Assign Pickup To Runner"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Assign Pickup To Runner" ||
                        location === "/pickup/assign-pickup-to-runner"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/pickup/assign-pickup-to-runner"
                >
                  <ListItemText
                    primary={`${t("pickup_section.assign_pickup_to_runner")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Receive Pickup")}
                  key="Receive Pickup"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Receive Pickup" ||
                        location === "/pickup/recive-pickup"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/pickup/recive-pickup"
                >
                  <ListItemText
                    primary={`${t("pickup_section.receive_pickup")}`}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedIndex("Pickup Management")}
                  key="Pickup Management"
                  sx={{
                    "& span ": {
                      color:
                        selectedIndex === "Pickup Management" ||
                        location === "/pickup/pickup-managment"
                          ? "var(--primary-color)"
                          : "currentColor",
                      fontSize: 13,
                    },
                  }}
                  component={NavLink}
                  to="/pickup/pickup-managment"
                >
                  <ListItemText
                    primary={`${t("pickup_section.pickup_managment")}`}
                  />
                </ListItemButton>
              </List>
            </CollapsableListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
