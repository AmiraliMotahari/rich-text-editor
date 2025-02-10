import RichTextEditor from "@/components/RichTextEditor";


export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Rich Text Editor</h1>
      <RichTextEditor placeholder="yes"/>
    </div>
  );
}
