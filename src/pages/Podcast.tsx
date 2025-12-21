import GenericCrud, { SchemaField } from "@/components/GenericCrud";
import { BASE_URL } from "@/constants/config";

const podcastSchema: SchemaField[] = [
  { name: "topic", type: "string", required: true },
  { name: "place", type: "string", required: true },
  { name: "date", type: "string", required: true },
];

const token = localStorage.getItem("token") ?? "";

const Podcasts = () => {
  return (
    <GenericCrud
      apiPath={`${BASE_URL}/podcasts`}
      schema={podcastSchema}
      token={token}
      title="Podcast Management"
    />
  );
};

export default Podcasts;
