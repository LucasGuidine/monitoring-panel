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
