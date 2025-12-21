import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const testimonialSchema: SchemaField[] = [
  { name: "name", type: "string", required: true },
  { name: "role", type: "string", required: true },
  { name: "image", type: "file", required: false },
  { name: "quote", type: "string", required: true },
  { name: "rating", type: "number" },
  { name: "company", type: "string" },
];

const token = localStorage.getItem("token") ?? "";

const Testimonials = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/testimonials`}
      schema={testimonialSchema}
      token={token}
      title="Testimonials Management"
    />
  );
};

export default Testimonials;
