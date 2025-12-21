import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const courseSchema: SchemaField[] = [
  { name: "title", type: "string", required: true },
  { name: "description", type: "string", required: true },
  { name: "thumbnail", type: "file", required: true },
  { name: "instructor", type: "string", required: true },
  { name: "duration", type: "string", required: true },
  { name: "level", type: "string", required: true },
  { name: "lessons", type: "string", required: true },
  { name: "badge", type: "string" },
  { name: "link", type: "string" },
  { name: "priority", type: "number" },
];

const token = localStorage.getItem("token") ?? "";

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
