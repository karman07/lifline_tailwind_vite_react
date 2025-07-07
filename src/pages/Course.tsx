import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const courseSchema: SchemaField[] = [
  { name: "title", type: "string", required: true },
  { name: "description", type: "string", required: true },
  { name: "thumbnail", type: "file", required: true },
  { name: "instructor", type: "string", required: true },
  { name: "duration", type: "string", required: true },
  { name: "level", type: "string", required: true },
  { name: "lessons", type: "number", required: true },
  { name: "badge", type: "string" },
  { name: "link", type: "string" },
];

const token =
  localStorage.getItem("token") ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODZiYTVhY2E1N2JkZWQyYTNhOTUxZjkiLCJlbWFpbCI6Imthcm1hbnNpbmdoYXJvcmEwNkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE4ODg2NzksImV4cCI6MTc1MTk3NTA3OX0.0KWCj-jvCPoiTZrvnPZkJx64zCmbLs-PFlYFEAYBsO8";

const Courses = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/courses`}
      schema={courseSchema}
      token={token}
      title="Course Management"
    />
  );
};

export default Courses;
