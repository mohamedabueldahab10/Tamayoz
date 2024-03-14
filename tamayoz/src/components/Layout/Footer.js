import * as React from "react"
import Container from"@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import styles from "../../assets/css/modules/auth/Login.module.css";
import { useTranslation } from "react-i18next";


export default function Footer() {
  const { t } = useTranslation("login");  
  return (
    <Box
      component="footer"
      className={styles.footer}
    >
      <Container  
      sx={{
        Width:"100%",
        display: "grid",
        placeItems: "center",
        height: "100px",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }} maxWidth="lg">
      <div className={styles.quickFooterActions}>
          <div>{t("quick_actions.privacy_policy")}</div>
          <div>{t("quick_actions.about_us")}</div>
          <div>{t("quick_actions.contact_us")}</div>
          <div>{t("quick_actions.help")}</div>
          <div>{t("quick_actions.language")}</div>
        </div>
        <Box>
          <Box sx={{display: "flex", justifyContent: "center",alignItems: "center"}}>
          <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
            </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://your-website.com/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}