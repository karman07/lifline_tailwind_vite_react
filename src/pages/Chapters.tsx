import { BASE_URL } from "@/constants/config";
import GenericCrud, { SchemaField } from "../components/GenericCrud";

const token = localStorage.getItem("token")!;

const schema : SchemaField[] =  [
  { name: "chapter", type: "string", required: true },
  { name: "book", type: "string", required: true },
  { name: "type", type: "string", required: true },
  { name: "file", type: "file", required: true },
];

export default function Chapters() {
  return (
    <GenericCrud
      title="Chapters & PDFs"
      token={token}
      apiPath={`${BASE_URL}/chapters`}
      schema={schema}
    />
  );
}
