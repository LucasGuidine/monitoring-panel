import { ReactNode } from "react";
import * as Styled from "./styles";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "destructive";
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <Styled.BadgeContainer variant={variant}>{children}</Styled.BadgeContainer>
  );
}
