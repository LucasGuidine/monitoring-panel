import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
`;

export const Field = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: white;
  cursor: pointer;
`;

export const CancelButton = styled(Button)`
  background: #aaa;
`;