import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const studentSchema: SchemaField[] = [
  { name: "name", type: "string", required: true },
  { name: "thesisTitle", type: "string", required: true },
  { name: "degree", type: "string", required: true },
  { name: "year", type: "string", required: true },
  { name: "image", type: "file" },
];

const token = localStorage.getItem("token") ?? "";

const Students = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/students`}
      schema={studentSchema}
      token={token}
      title="Students Management"
    />
  );
};

export default Students;
