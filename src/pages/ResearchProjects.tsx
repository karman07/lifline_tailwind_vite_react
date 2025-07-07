import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const researchSchema: SchemaField[] = [
  { name: "title", type: "string", required: true },
  { name: "amount", type: "string", required: true },
  { name: "fundingAgency", type: "string", required: true },
  { name: "scheme", type: "string", required: true },
  { name: "duration", type: "string", required: true },
  { name: "investigators", type: "string", required: true },
  { name: "discription", type: "string", required: true },
  { name: "link", type: "string" },
];

const token =
  localStorage.getItem("token") ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODZiYTVhY2E1N2JkZWQyYTNhOTUxZjkiLCJlbWFpbCI6Imthcm1hbnNpbmdoYXJvcmEwNkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE4ODg2NzksImV4cCI6MTc1MTk3NTA3OX0.0KWCj-jvCPoiTZrvnPZkJx64zCmbLs-PFlYFEAYBsO8";

const ResearchProjects = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/research-projects`}
      schema={researchSchema}
      token={token}
      title="Research Projects Management"
    />
  );
};

export default ResearchProjects;
