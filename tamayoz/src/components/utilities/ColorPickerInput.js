import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import styled from 'styled-components';

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const ColorsArr = [
  '#ffffff',
  '#ff9c9c',
  '#f7c698',
  '#fde388',
  '#bbd7f8',
  '#d9a8cc',
  '#f8d6cb',
  '#89e1db',
  '#97a6f9',
  '#ff9ecc',
  '#b7edbe',
  '#e6dbfc',
];
const ColorOption = styled.div`
  width: 30px;
  height: 20px;
  margin: 4px;
  border: 2px solid
    ${(props) => (props.selected ? 'var(--primary-color)' : '#4e4e4e')};
  background-color: ${(props) => props.color};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.selected ? '0 0 5px rgba(0, 0, 0, 0.3)' : 'none'};
`;
const ColorPickerInput = ({ name }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={ColorsArr[0]}
      render={({ field }) => (
        <div>
          <ColorPickerContainer>
            {ColorsArr.map((color) => (
              <ColorOption
                key={color}
                color={color}
                selected={color === field.value}
                onClick={() => field.onChange(color)}
              />
            ))}
          </ColorPickerContainer>
        </div>
      )}
    />
  );
};
export default ColorPickerInput;
