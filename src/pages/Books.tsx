import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const bookSchema: SchemaField[] = [
  { name: "title", type: "string", required: true },
  { name: "description", type: "string" },
  { name: "price", type: "string" },
  { name: "image", type: "file" },
  { name: "tableOfContents", type: "array" },
  { name: "link", type: "string" },
  { name: "priority", type: "number" },
];

const token = localStorage.getItem("token") ?? "";
const Books = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/books`}
      schema={bookSchema}
      token={token}
      title="Books Management"
    />
  );
};

export default Books;
