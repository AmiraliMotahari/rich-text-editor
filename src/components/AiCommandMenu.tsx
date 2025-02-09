import type React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AICommandMenuProps {
  position: { top: number; left: number };
  onSelect: (command: string) => void;
  isLoading: boolean;
}

const AICommandMenu: React.FC<AICommandMenuProps> = ({
  position,
  onSelect,
  isLoading,
}) => {
  const commands = [
    { label: "Generate", command: "generate a story with 500 words" },
    { label: "Summarize", command: "summarize" },
    { label: "Translate", command: "translate" },
    { label: "Explain", command: "explain" },
  ];

  return (
    <div
      className="absolute z-50 bg-background border rounded-lg shadow-lg p-2 space-y-2"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-2">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        commands.map((cmd) => (
          <Button
            key={cmd.command}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onSelect(cmd.command)}
          >
            {cmd.label}
          </Button>
        ))
      )}
    </div>
  );
};

export default AICommandMenu;

