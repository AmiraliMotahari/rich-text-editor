import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Editor } from "@tiptap/react";

type TextStyleProps = {
  editor: Editor;
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const TextStyleOptions = [
  {
    title: "Paragraph",
    value: "paragraph",
  },
  {
    title: "Heading 1",
    value: "1",
  },
  {
    title: "Heading 2",
    value: "2",
  },
  {
    title: "Heading 3",
    value: "3",
  },
  {
    title: "Heading 4",
    value: "4",
  },
  {
    title: "Heading 5",
    value: "5",
  },
  {
    title: "Heading 6",
    value: "6",
  },
];

const TextStyle = ({ editor }: TextStyleProps) => {
  const setHeading = (level: HeadingLevel) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };
  return (
    <Select
      onValueChange={(value) => {
        if (value === "paragraph") {
          editor.chain().focus().setParagraph().run();
        } else {
          setHeading(Number.parseInt(value, 10) as HeadingLevel);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Paragraph" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="paragraph">Paragraph</SelectItem>
        <SelectItem value="1">Heading 1</SelectItem>
        <SelectItem value="2">Heading 2</SelectItem>
        <SelectItem value="3">Heading 3</SelectItem>
        <SelectItem value="4">Heading 4</SelectItem>
        <SelectItem value="5">Heading 5</SelectItem>
        <SelectItem value="6">Heading 6</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TextStyle;
