import { ReactNode } from "react";
import * as Styled from "./styles";

type BadgeVariant = "default" | "destructive" | "online" | "offline" | "alert";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <Styled.BadgeContainer variant={variant}>{children}</Styled.BadgeContainer>
  );
}
