import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const subscriberSchema: SchemaField[] = [
  { name: "email", type: "string", required: true },
];

const token = localStorage.getItem("token") ?? "";

const Subscribers = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/subscribe`}
      schema={subscriberSchema}
      token={token}
      title="Subscribers Management"
    />
  );
};

export default Subscribers;
