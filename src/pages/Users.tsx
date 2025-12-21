import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const userSchema: SchemaField[] = [
  { name: "name", type: "string", required: true },
  { name: "email", type: "string", required: true },
  { name: "password", type: "string", required: true },
  { name: "firebaseUid", type: "string", required: true },
  { name: "role", type: "string" },
  { name: "verified", type: "boolean" },
];

const token = localStorage.getItem("token") ?? "";

const UsersPage = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/users`}
      schema={userSchema}
      token={token}
      title="User Management"
    />
  );
};

export default UsersPage;
