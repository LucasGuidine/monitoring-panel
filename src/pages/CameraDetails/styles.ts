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

export const AlertCard = styled.div<{ highlighted?: boolean }>`
  display: flex;
  gap: 1rem;
  background: ${(props) => (props.highlighted ? "#fff7ed" : "#f9fafb")};
  padding: 1rem;
  border-radius: 10px;
  border: ${(props) => (props.highlighted ? "2px solid #f97316" : "none")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

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

export const EditButton = styled.button<{ active?: boolean }>`
  margin: 8px 0;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: ${(props) => (props.active ? "#d32f2f" : "#1976d2")};
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => (props.active ? "#b71c1c" : "#115293")};
  }
`;

export const ClearButton = styled.button`
  margin-left: 1rem;
  padding: 0.4rem 0.8rem;
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 500;

  &:hover {
    background-color: #e04c4c;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
`;

export const StageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;
