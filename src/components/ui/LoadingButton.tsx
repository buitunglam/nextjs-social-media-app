import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface loadingButtonProps {
  loading: boolean;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

const LoadingButton = ({
  loading,
  className,
  disabled,
  onClick,
  ...props
}: loadingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      {loading ? <Loader2 className="size-5 animate-spin" /> : null}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
