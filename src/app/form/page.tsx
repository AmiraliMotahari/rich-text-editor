import FormEditor from "@/components/FormEditor";

const Page = () => {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Form: Rich Text Editor
        </h1>
        <div className="container w-full flex justify-center items-start">
          <FormEditor />
        </div>
      </div>
    );
}
 
export default Page;