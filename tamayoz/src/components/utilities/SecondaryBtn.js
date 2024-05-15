import styled from "styled-components";
const SecondaryBtn = styled.button`
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
