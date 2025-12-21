import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const articleSchema: SchemaField[] = [
  { name: "year", type: "number", required: true },
  { name: "authors", type: "string", required: true },
  { name: "title", type: "string", required: true },
  { name: "publication", type: "string", required: true },
  { name: "monthYear", type: "string", required: true },
];

const token = localStorage.getItem("token") ?? "";

const Articles = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/articles`}
      schema={articleSchema}
      token={token}
      title="Articles Management"
    />
  );
};

export default Articles;