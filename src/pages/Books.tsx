import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const userSchema: SchemaField[] = [
  { name: "title", type: "string", required: true },
  { name: "description", type: "string", required: true },
  { name: "price", type: "string", required: true },
  { name: "image", type: "file", required: true },
  { name: "tableOfContents", type: "array" },
  { name: "link", type: "string" },
];
;

const token = localStorage.getItem("token") ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODZiYTVhY2E1N2JkZWQyYTNhOTUxZjkiLCJlbWFpbCI6Imthcm1hbnNpbmdoYXJvcmEwNkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE4ODg2NzksImV4cCI6MTc1MTk3NTA3OX0.0KWCj-jvCPoiTZrvnPZkJx64zCmbLs-PFlYFEAYBsO8";
console.log(token)
const Books = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/books`}
      schema={userSchema}
      token={token}
      title="Books Management"
    />
  );
};

export default Books;
