import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const researchSchema: SchemaField[] = [
  { name: "name", type: "string", required: true },
  { name: "role", type: "string", required: true },
  { name: "image", type: "file", required: false },
  { name: "quote", type: "string", required: true }
];

const token =
  localStorage.getItem("token") ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODZiYTVhY2E1N2JkZWQyYTNhOTUxZjkiLCJlbWFpbCI6Imthcm1hbnNpbmdoYXJvcmEwNkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE4ODg2NzksImV4cCI6MTc1MTk3NTA3OX0.0KWCj-jvCPoiTZrvnPZkJx64zCmbLs-PFlYFEAYBsO8";

const Testimonials = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/testimonials`}
      schema={researchSchema}
      token={token}
      title="Testimonials Management"
    />
  );
};

export default Testimonials;
