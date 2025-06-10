// import { Badge } from "lucide-react";
import type { Character } from "../types/character";
import { cn } from "../../lib/utils";

interface CharacterStatusBadgeProps {
  status: Character["status"];
  className?: string;
}

export function CharacterStatusBadge({
  status,
  className,
}: CharacterStatusBadgeProps) {
  const getStatusColor = (status: Character["status"]) => {
    switch (status) {
      case "Alive":
        return "bg-green-500 text-green-800 border-green-200";
      case "Dead":
        return "bg-red-500 text-red-800 border-red-200";
      case "unknown":
        return "bg-gray-500 text-gray-800 border-gray-200";
      default:
        return "bg-gray-500 text-gray-800 border-gray-200";
    }
  };
  console.log(status);

  return <div className={cn(getStatusColor(status), className)}>{status}</div>;
}
