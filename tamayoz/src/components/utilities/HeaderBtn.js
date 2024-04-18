import styled from "styled-components";

const HeaderBtn = styled.button`
  width: 100px;
  min-width: 80px;
  height: 40px;
  background: ${(props) => (props.color ? props.color : "var(--primary-color)")};
  border: 0;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  text-transform: capitalize;
  cursor: pointer;
`;
export default HeaderBtn;

