import { EditorBubble, removeAIHighlight, useEditor } from "novel";
import { type ReactNode, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import Magic from "@/components/novel/icons/magic";
// import { AISelector } from "./ai-selector";

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open && editor) removeAIHighlight(editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!editor) return null;

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false);
          editor.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open ? // <AISelector open={open} onOpenChange={onOpenChange} />
      null : (
        <>
          {/* <Button
            className="gap-1 rounded-none text-purple-500"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <Magic className="h-5 w-5" />
            Ask AI
          </Button> */}
          {children}
        </>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
