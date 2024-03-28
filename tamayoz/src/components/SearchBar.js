import React from "react";
import { Input, Button } from "@mui/material";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
const SearchButton = styled(Button)`
  border-radius: 50% !important;
  border-top-left-radius: 0px !important;
  width: 57px;
  background: var(--gradient);
  height: 57px;
  border: none !important;
`;
const SearchInput = styled(Input)`
  border: none !important;
  box-shadow: 0px 3px 6px #c4c8d066;
  -webkit-padding-end: 67px !important;
  padding-inline-end: 67px !important;
  width: 353px;
  height: 50px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 12px !important;
  font-size: 21px;
`;
const searchInputIcon = {
  position: "absolute",
  right: 0,
};
export default function SearchBar(props) {
  const { t } = useTranslation("layout");
  const { i18n } = useTranslation();
  const { language } = i18n;
  const { searchBarInput, setSearchBarInput, handleSearchSubmit } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit();
    setSearchBarInput("");
  };
  return (
    <div>
      <div className={`d-flex position-relative`}>
        <form onSubmit={handleSubmit}>
          <SearchInput
            style={{ paddingInline: "20px" }}
            disableUnderline
            value={searchBarInput}
            size="md"
            placeholder={t("navbar.search")}
            onChange={(e) => setSearchBarInput(e.target.value)}
            dir={language === "ar" ? "rtl" : "ltr"}
          />
          <SearchButton  type="submit" sx={searchInputIcon}>
            <SearchIcon
              sx={{
                color: "#fff",
                size: "large",
              }}
            />
          </SearchButton>
        </form>
      </div>
    </div>
  );
}
