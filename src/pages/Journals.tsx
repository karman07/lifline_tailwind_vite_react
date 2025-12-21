import { BASE_URL } from "@/constants/config";
import GenericCrud, { SchemaField } from "../components/GenericCrud";

const token = localStorage.getItem("token") ?? "";

const journalSchema: SchemaField[] = [
  { name: "authors", type: "string", required: true },
  { name: "title", type: "string", required: true },
  { name: "journal", type: "string", required: true },
  { name: "year", type: "string", required: true },
  { name: "volume", type: "string" },
  { name: "number", type: "string" },
  { name: "pages", type: "string", required: true },
];

export default function Journals() {
  return (
    <GenericCrud
      title="Journal Publications"
      token={token}
      apiPath={`${BASE_URL}/journals`}
      schema={journalSchema}
    />
  );
}
