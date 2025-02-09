import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { Editor } from "@tiptap/react";
import type React from "react";

type DownloadDropdownProps = {
  editor: Editor | null;
};

const DownloadDropdown = ({ editor }: DownloadDropdownProps) => {
  if (!editor) return;

  const handleDownload = (format: string) => {
    let blob: Blob;
    let filename: string;

    switch (format) {
      case "html":
        const html = editor.getHTML();
        blob = new Blob([html], { type: "text/html" });
        filename = "rich-text-content.html";
        break;
      case "txt":
        const text = editor.getText();
        blob = new Blob([text.replace(/<[^>]+>/g, "")], {
          type: "text/plain",
        });
        filename = "rich-text-content.txt";
        break;
      case "json":
        const json = editor.getJSON();
        blob = new Blob([JSON.stringify({ json })], {
          type: "application/json",
        });
        filename = "rich-text-content.json";
        break;
      case "pdf":
        const pdfText = editor.getText();
        const pdf = new jsPDF();
        pdf.html(pdfText, {
          callback: (pdf) => {
            pdf.save("rich-text-content.pdf");
          },
        });
        return;
      default:
        return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Choose Format</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDownload("html")}>
            HTML
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload("txt")}>
            Plain Text
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload("json")}>
            JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload("pdf")}>
            PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DownloadDropdown;
