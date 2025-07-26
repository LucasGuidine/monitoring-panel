import styled, { css } from "styled-components";

const variants = {
  default: css`
    background-color: #e0e0e0;
    color: #333;
  `,
  destructive: css`
    background-color: #f87171;
    color: white;
  `,
};

export const BadgeContainer = styled.span<{
  variant?: "default" | "destructive";
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  height: 24px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
  user-select: none;
  ${({ variant = "default" }) => variants[variant]}
`;
