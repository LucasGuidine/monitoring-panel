import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
  }
`;

export const Video = styled.video`
  width: 100%;
  max-height: 360px;
  border-radius: 12px;
  background-color: #000;
  margin-bottom: 1rem;
`;

export const Info = styled.div`
  margin-bottom: 2rem;

  p {
    margin: 0.2rem 0;
  }
`;

export const AlertsSection = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
`;

export const AlertsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
`;

export const AlertCard = styled.div`
  display: flex;
  gap: 1rem;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  img {
    width: 100px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    strong {
      font-size: 0.95rem;
      margin-bottom: 0.3rem;
    }

    p {
      font-size: 0.85rem;
      color: #555;
    }
  }
`;
