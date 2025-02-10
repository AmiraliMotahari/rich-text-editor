"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingToolbarProps {
  editor: Editor;
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ editor }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tools = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: Underline,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive("underline"),
    },
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
  ];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex + 1) % tools.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        tools[activeIndex].action();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex]
  ); // Removed tools from dependency array

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!editor) {
    return null;
  }

  return (
    <div
      data-testid="floating-menu"
      className="floating-menu flex items-center space-x-2 bg-background border rounded-md shadow-sm p-1"
    >
      {tools.map((tool, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          onClick={tool.action}
          className={`${tool.isActive() ? "bg-accent" : ""} ${
            index === activeIndex ? "ring-2 ring-primary" : ""
          }`}
        >
          <tool.icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
};

export default FloatingToolbar;
