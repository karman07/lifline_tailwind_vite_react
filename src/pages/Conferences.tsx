import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const conferenceSchema: SchemaField[] = [
  { name: "year", type: "number", required: true },
  { name: "authors", type: "string", required: true },
  { name: "title", type: "string", required: true },
  { name: "venue", type: "string" },
  { name: "location", type: "string" },
  { name: "details", type: "string" },
];

const token = localStorage.getItem("token") ?? "";

const Conferences = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/conferences`}
      schema={conferenceSchema}
      token={token}
      title="Conferences Management"
    />
  );
};

export default Conferences;