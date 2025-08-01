import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

export const Title = styled.h2`
  margin-bottom: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;

export const AddButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

export const AlertsSection = styled.section`
  margin-top: 40px;
  margin-bottom: 40px;

  h2 {
    margin-bottom: 16px;
  }
`;

export const AnalyticsButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
`;

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
