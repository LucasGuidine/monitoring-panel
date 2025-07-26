import styled from "styled-components";

export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StatusDot = styled.div<{ color: string }>`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: ${({ color }) => color};
`;

export const Info = styled.div`
  padding: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button<{ danger?: boolean }>`
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ danger }) => (danger ? "#ff4d4f" : "#1890ff")};
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
`;
