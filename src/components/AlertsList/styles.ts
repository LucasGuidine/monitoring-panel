import styled from "styled-components";

export const AlertsWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

export const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const CameraName = styled.span`
  font-weight: 600;
`;

export const Timestamp = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const Container = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

export const Content = styled.div`
  padding: 16px;
  padding: 1rem;
`;
