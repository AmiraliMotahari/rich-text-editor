import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Editor } from "@tiptap/react";

type FontSizeProps = {
  editor: Editor;
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const fontSizes = [
  { label: "Very Small", value: "10" },
  { label: "Small", value: "12" },
  { label: "Normal", value: "16" },
  { label: "Large", value: "20" },
  { label: "Huge", value: "24" },
];

const FontSize = ({ editor }: FontSizeProps) => {
  return (
    <Select
      onValueChange={(value) => {
        editor
          .chain()
          .focus()
          .setMark("textStyle", {
            fontSize: value,
          })
          .run();
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Font Size" />
      </SelectTrigger>
      <SelectContent>
        {fontSizes.map((size) => (
          <SelectItem key={size.value} value={size.value}>
            {size.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontSize;
