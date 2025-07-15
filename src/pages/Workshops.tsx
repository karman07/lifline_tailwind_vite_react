import { BASE_URL } from "@/constants/config";
import GenericCrud, { SchemaField } from "../components/GenericCrud";

const token = localStorage.getItem("token")!;

const schema: SchemaField[] = [
  { name: "year", type: "number", required: true },
  { name: "events", type: "array", required: true },
];

export default function Workshops() {
  return (
    <GenericCrud
      title="Workshops / Seminars"
      token={token}
      apiPath={`${BASE_URL}/workshops`}
      schema={schema}
    />
  );
}
