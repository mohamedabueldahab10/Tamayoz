import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => (props.small ? "170px" : props.customWidth ? props.customWidth : "220px")};
  min-width: ${(props) => (props.customMinWidth ? props.customMinWidth : "150px")};
  height: 40px;
  background: ${(props) => (props.color ? props.color : "var(--primary-color)")};
  border: 0;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.hoverColor ? props.hoverColor : "var(--text-primary-color)")};
  }
`;
export default StyledButton;

