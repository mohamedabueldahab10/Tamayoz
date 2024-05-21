import styled from "styled-components";
const SecondaryBtn = styled.button`
    width: ${(props) => (props.small ? "170px" : props.customwidth ? props.customwidth : "220px")};
    min-width: ${(props) => (props.customminwidth ? props.customminwidth : "150px")};
    height: 40px;
    padding: 5px 10px;
    height: 40px;
    background-color: var(--btn-bg-color);
    color: var(--primary-color);
    font-size: 16px;
    font-weight: bold;
    text-transform: none;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: var(--secondary-color);
    }
`;
export default SecondaryBtn;
