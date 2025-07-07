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

const token = localStorage.getItem("token") ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODZiYTVhY2E1N2JkZWQyYTNhOTUxZjkiLCJlbWFpbCI6Imthcm1hbnNpbmdoYXJvcmEwNkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE4ODg2NzksImV4cCI6MTc1MTk3NTA3OX0.0KWCj-jvCPoiTZrvnPZkJx64zCmbLs-PFlYFEAYBsO8";
console.log(token)
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
