import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const contactSchema: SchemaField[] = [
  { name: "name", type: "string", required: true },
  { name: "email", type: "string", required: true },
  { name: "message", type: "string", required: true },
  { name: "fileUrl", type: "file" },
];

const token = localStorage.getItem("token") ?? "";

const Contact = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/contact`}
      schema={contactSchema}
      token={token}
      title="Contact Messages Management"
    />
  );
};

export default Contact;