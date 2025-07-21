import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const researchSchema: SchemaField[] = [
  { name: "email", type: "string", required: true },
];

const token =
  localStorage.getItem("token") ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODZiYTVhY2E1N2JkZWQyYTNhOTUxZjkiLCJlbWFpbCI6Imthcm1hbnNpbmdoYXJvcmEwNkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE4ODg2NzksImV4cCI6MTc1MTk3NTA3OX0.0KWCj-jvCPoiTZrvnPZkJx64zCmbLs-PFlYFEAYBsO8";

const Subscribers = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/subscribe`}
      schema={researchSchema}
      token={token}
      title="Subscribers Management"
    />
  );
};

export default Subscribers;
