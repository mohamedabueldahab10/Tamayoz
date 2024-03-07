import * as React from "react"
import Container from"@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import styles from "../../assets/css/modules/auth/Login.module.css";

export default function Footer() {
  return (
    <Box
      component="footer"
      className={styles.footer}
      sx={{
        display: "grid",
        placeItems: "center",
        height: "100px",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
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