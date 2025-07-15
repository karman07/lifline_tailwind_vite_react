import { BASE_URL } from "@/constants/config";
import GenericCrud, { SchemaField } from "../components/GenericCrud";

const token = localStorage.getItem("token")!;

const schema: SchemaField[] = [
  { name: "description", type: "string", required: true },
];

export default function AdminPositions() {
  return (
    <GenericCrud
      title="Administrative Positions"
      token={token}
      apiPath={`${BASE_URL}/positions`}    
      schema={schema}
    />
  );
}
