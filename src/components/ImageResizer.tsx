import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Editor } from "@tiptap/react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type ImageResizerProps = {
  editor: Editor;
  open: boolean;
  onClose: () => void;
};

export default function ImageResizer({
  editor,
  open,
  onClose,
}: ImageResizerProps) {
  const [src, setSrc] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("inline");

  useEffect(() => {
    if (!editor) return;

    const { selection } = editor.state;
    const node = selection.$anchor.nodeBefore || selection.$anchor.nodeAfter;

    if (node?.type.name === "image") {
      const image = node.attrs;
      setSrc(image.src || "");
      setWidth(image.width ? String(image.width) : "");
      setHeight(image.height ? String(image.height) : "");
      setAlt(image.alt || "");
      setTitle(image.title || "");
      setPosition(
        image.style?.includes("float")
          ? image.style.split(":")[1].trim()
          : "inline"
      );
    }
  }, [editor, open]);

  const updateImage = () => {
    if (!src) return;

    editor
      .chain()
      .focus()
      .updateAttributes("image", {
        src,
        width: width ? Number(width) : null,
        height: height ? Number(height) : null,
        alt: alt || "",
        title: title || "",
        style: position === "inline" ? "" : `float: ${position};`,
      })
      .run();

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            placeholder="Image URL"
            value={src}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSrc(e.target.value)
            }
          />
          <Input
            placeholder="Width"
            value={width}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setWidth(e.target.value)
            }
          />
          <Input
            placeholder="Height"
            value={height}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHeight(e.target.value)
            }
          />
          <Input
            placeholder="Alt Text"
            value={alt}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAlt(e.target.value)
            }
          />
          <Input
            placeholder="Title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Select
            defaultValue={position}
            onValueChange={(value) => setPosition(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Position" className="w-full" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">left</SelectItem>
              <SelectItem value="right">right</SelectItem>
              <SelectItem value="inline">inline</SelectItem>
              <SelectItem value="center">center</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={updateImage}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
