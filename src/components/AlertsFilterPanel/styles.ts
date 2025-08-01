import styled from "styled-components";

export const FiltersWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-end;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
    color: #444;
    min-width: 150px;

    input,
    select {
      margin-top: 0.3rem;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 0.95rem;
      background-color: white;
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: #007bff;
      }
    }
  }
`;

export const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #eee;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ddd;
  }
`;
