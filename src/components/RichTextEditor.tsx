"use client";

import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Text from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Typography from "@tiptap/extension-typography";
import { common, createLowlight } from "lowlight";

import Toolbar from "./Toolbar";
import DownloadDropdown from "./DownloadDropdown";
import ImageResizer from "./ImageResizer";
import { AICommands } from "@/extensions/AiCommands";
import AICommandMenu from "@/components/AiCommandMenu";
import { FontSize } from "@/extensions/FontSize";

const lowlight = createLowlight(common);

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

type RichTextEditorProps = {
  placeholder?: string;
  contentValue?: string;
  onChange?: (richText: string) => void;
};

const RichTextEditor = ({
  placeholder = "Start typing here...",
  contentValue,
  onChange,
}: RichTextEditorProps) => {
  const [content, setContent] = useState(contentValue);
  const [showImageResizer, setShowImageResizer] = useState(false);
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [aiMenuPosition, setAIMenuPosition] = useState({ top: 0, left: 0 });
  const [isLoading, setIsLoading] = useState(false);
  // const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  // const floatingMenuRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "tiptap", // Apply the styles we defined above,
      },
    },
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        codeBlock: false,
      }),
      Placeholder.configure({
        // Use a placeholder:
        placeholder: placeholder,
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === "heading") {
        //     return "What&apos;s the title?";
        //   }

        //   return "Can you add some further context?";
        // },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Text,
      Color.configure(),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
      Underline,
      CharacterCount,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Document,
      Dropcursor,
      Focus,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Highlight,
      HorizontalRule,
      Link,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
      Paragraph,
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
      }),
      TableHeader,
      TableRow,
      CustomTableCell,
      TaskItem,
      TaskList,
      Typography,
      AICommands,
      FontSize,
    ],
    autofocus: true,
    content: content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
      setContent(editor.getHTML());
      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;

      const currentLineText = $from.nodeBefore?.textContent || "";

      if (currentLineText.startsWith("/")) {
        const coords = editor.view.coordsAtPos($from.pos);
        setAIMenuPosition({ top: coords.bottom, left: coords.left });
        setShowAIMenu(true);
        // setShowFloatingMenu(false);
      } else if (currentLineText.trim() === "") {
        // setShowFloatingMenu(true);
        setShowAIMenu(false);
      } else {
        // setShowFloatingMenu(false);
        setShowAIMenu(false);
      }
    },
    // onFocus: () => {
    //   // setShowFloatingMenu(true);
    // },
    // onBlur: ({ event }) => {
    //   // if (
    //   //   floatingMenuRef.current &&
    //   //   !floatingMenuRef.current.contains(event.relatedTarget as Node)
    //   // ) {
    //   //   setShowFloatingMenu(false);
    //   // }
    // },
  });

  const handleImageUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result && editor) {
          editor
            .chain()
            .focus()
            .setImage({ src: e.target.result as string })
            .run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAICommand = useCallback(
    async (command: string) => {
      if (!editor) return;

      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;

      const currentLineText = $from.nodeBefore?.textContent || "";
      const prompt = currentLineText.startsWith("/")
        ? currentLineText.slice(1).trim()
        : currentLineText.trim();

      if (!prompt && command !== "generate a story with 500 words") {
        console.warn("Empty AI command prompt, skipping request.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command, prompt }),
        });

        if (!response.ok) {
          const errorResponse = await response.text();
          console.error("AI Command API Error:", errorResponse);
          throw new Error(
            `Failed to process AI command: ${response.statusText}`
          );
        }

        const data = await response.json();

        editor
          .chain()
          .focus()
          .deleteRange({
            from: $from.pos - currentLineText.length,
            to: $from.pos,
          })
          .insertContent(data.result)
          .run();
      } catch (error) {
        console.error("Error processing AI command:", error);
        // You might want to set an error state here to notify the user
      } finally {
        setIsLoading(false);
        setShowAIMenu(false);
      }
    },
    [editor]
  );

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto border rounded-lg shadow-lg bg-background">
      <Toolbar
        editor={editor}
        onImageUpload={handleImageUpload}
        onImageEdit={() => setShowImageResizer(true)}
      />
      {/* Todo: Fix */}
      {/* {editor && showFloatingMenu && (
        <div ref={floatingMenuRef} className="absolute z-10">
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <FloatingToolbar editor={editor} />
          </FloatingMenu>
        </div>
      )} */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[300px] prose max-w-none"
      />
      <DownloadDropdown editor={editor} />
      {editor && (
        <div className="p-2 text-sm text-gray-500">
          Characters: {editor.storage.characterCount.characters()}
        </div>
      )}
      {/* todo: Fix */}
      {showImageResizer && editor && (
        <ImageResizer
          editor={editor}
          open={showImageResizer}
          onClose={() => setShowImageResizer(false)}
        />
      )}
      {showAIMenu && (
        <AICommandMenu
          position={aiMenuPosition}
          onSelect={handleAICommand}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
