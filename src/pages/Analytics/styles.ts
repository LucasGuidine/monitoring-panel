import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

export const Card = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

export const BackButton = styled.button`
  background-color: transparent;
  color: #3b82f6;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  text-align: left;
  display: flex;

  &:hover {
    text-decoration: underline;
  }
`;
