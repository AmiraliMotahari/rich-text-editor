import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { cn } from "@/lib/utils";
import RichTextEditor from "./RichTextEditor";

type RichTextInputProps<S> = {
  nameInSchema: keyof S & string;
  fieldTitle?: string;
  placeholder?: string;
  description?: string;
  className?: string;
};

const RichTextInput = <S,>({
  nameInSchema,
  fieldTitle,
  placeholder,
  description,
  className,
}: RichTextInputProps<S>) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {fieldTitle ? <FormLabel>{fieldTitle}</FormLabel> : null}
          <FormControl>
            <RichTextEditor
              placeholder={placeholder}
              contentValue={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RichTextInput;
