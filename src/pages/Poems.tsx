import { BASE_URL } from "@/constants/config";
import GenericCrud, { SchemaField } from "../components/GenericCrud";

const token = localStorage.getItem("token")!;

const schema: SchemaField[] = [
  { name: "description", type: "string", required: true },
];

export default function Poems() {
  return (
    <GenericCrud
      title="Poems & Songs"
      token={token}
      apiPath={`${BASE_URL}/poems`}
      schema={schema}
    />
  );
}
