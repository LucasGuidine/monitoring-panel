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
  grid-column: span 2;

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

export const GroupByButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;

  button {
    background-color: transparent;
    border: 2px solid #6366f1;
    border-radius: 6px;
    padding: 8px 16px;
    font-weight: 600;
    color: #6366f1;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background-color: #6366f1;
      color: #fff;
    }

    &.active {
      background-color: #6366f1;
      color: white;
      cursor: default;
      pointer-events: none;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
  }

  @media (max-width: 480px) {
    gap: 8px;
    button {
      padding: 6px 12px;
      font-size: 14px;
    }
  }
`;
