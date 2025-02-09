"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import RichTextInput from "./rich-text-input";
import InputWithLabel from "./input-with-label";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const FormEditor = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "<p>Start typing here...</p>",
    },
  });
  function onSubmit(values: FormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start items-start gap-y-8 px-6"
      >
        <InputWithLabel<FormSchemaType>
          nameInSchema={"name"}
          fieldTitle="Name"
          className="w-full"
          placeholder="Name"
        />
        <RichTextInput<FormSchemaType>
          nameInSchema={"description"}
          fieldTitle="Description"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormEditor;
