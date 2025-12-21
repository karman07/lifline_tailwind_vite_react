import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const publicationSchema: SchemaField[] = [
  { name: "year", type: "number", required: true },
  { name: "authors", type: "string", required: true },
  { name: "title", type: "string", required: true },
  { name: "journal", type: "string", required: true },
  { name: "volume", type: "string" },
  { name: "issue", type: "string" },
  { name: "pages", type: "string" },
  { name: "file", type: "file" },
];

const token = localStorage.getItem("token") ?? "";

const Publications = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/publications`}
      schema={publicationSchema}
      token={token}
      title="Publications Management"
    />
  );
};

export default Publications;