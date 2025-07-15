import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { COLORS } from "@/constants/colors";

export type SchemaField = {
  name: string;
  type: "string" | "number" | "boolean" | "file" | "array";
  required?: boolean;
};

type Props = {
  apiPath: string;
  schema: SchemaField[];
  token: string;
  title: string;
};

const GenericCrud: React.FC<Props> = ({ apiPath, schema, token, title }) => {
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, any>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiPath, { headers });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const openModal = (entry?: any) => {
    if (entry) {
      setForm(entry);
      setEditingId(entry._id);
    } else {
      const emptyForm: Record<string, any> = {};
      schema.forEach((field) => {
        if (field.type === "array") emptyForm[field.name] = [];
        else if (field.type === "boolean") emptyForm[field.name] = false;
        else if (field.type === "number") emptyForm[field.name] = 0;
        else emptyForm[field.name] = "";
      });
      setForm(emptyForm);
      setEditingId(null);
    }
    setFiles({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({});
    setEditingId(null);
    setFiles({});
  };

  const handleChange = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  const handleArrayChange = (name: string, value: string, index: number) => {
    const updated = [...(form[name] || [])];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [name]: updated }));
  };

  const addArrayItem = (name: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), ""],
    }));
  };

  const removeArrayItem = (name: string, index: number) => {
    const updated = [...(form[name] || [])];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, [name]: updated }));
  };

  const handleSubmit = async () => {
    // ✅ FIXED VALIDATION INCLUDING FILES
    for (const field of schema) {
      if (field.required) {
        const isFile = field.type === "file";
        const hasValue = isFile ? files[field.name] : form[field.name];
        if (!hasValue || hasValue === "") {
          alert(`Please fill out the required field: ${field.name}`);
          return;
        }
      }
    }

    const formData = new FormData();

    schema.forEach(({ name, type }) => {
      const value = form[name];
      if (type === "file" && files[name]) {
        formData.append(name, files[name] as Blob); // ✅ field name = 'file'
      } else if (type === "array") {
        (value || []).forEach((item: string) =>
          formData.append(`${name}[]`, item)
        );
      } else if (value !== undefined && value !== null) {
        formData.append(name, value);
      }
    });

    try {
      if (editingId) {
        await axios.patch(`${apiPath}/${editingId}`, formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(apiPath, formData, {
          headers: { ...headers, "Content-Type": "multipart/form-data" },
        });
      }
      closeModal();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${apiPath}/${id}`, { headers });
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="p-6 max-w-7xl mx-auto rounded-xl shadow-md"
      style={{ backgroundColor: COLORS.white }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.grayText }}>
          {title}
        </h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-1 px-4 py-2 rounded transition"
          style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm text-left">
          <thead style={{ backgroundColor: COLORS.hoverBg }}>
            <tr>
              {schema.map((field) => (
                <th key={field.name} className="px-4 py-3 capitalize">
                  {field.name}
                </th>
              ))}
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={schema.length + 1} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((entry) => (
                <tr
                  key={entry._id}
                  className="border-t transition-all"
                  style={{ backgroundColor: COLORS.white }}
                >
                  {schema.map((field) => (
                    <td key={field.name} className="px-4 py-2">
                      {field.type === "array"
                        ? (entry[field.name] || []).join(", ")
                        : field.type === "file"
                        ? entry[field.name] ? (
                            <a
                              href={entry[field.name]}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-500 underline"
                            >
                              View File
                            </a>
                          ) : (
                            "-"
                          )
                        : entry[field.name]?.toString() || "-"}
                    </td>
                  ))}
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => openModal(entry)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div
            className="w-full max-w-lg h-[80vh] bg-white p-6 rounded-lg shadow-xl relative flex flex-col"
            style={{ backgroundColor: COLORS.white }}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {editingId ? "Edit Entry" : "Add New Entry"}
            </h3>
            <div className="overflow-y-auto pr-2 flex-1 space-y-4">
              {schema.map((field) => {
                if (field.type === "array") {
                  return (
                    <div key={field.name}>
                      <label className="font-medium capitalize block mb-1">
                        {field.name}
                      </label>
                      {(form[field.name] || []).map(
                        (item: string, idx: number) => (
                          <div className="flex gap-2 mb-2" key={idx}>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) =>
                                handleArrayChange(
                                  field.name,
                                  e.target.value,
                                  idx
                                )
                              }
                              className="flex-1 p-2 border rounded"
                            />
                            <button
                              onClick={() =>
                                removeArrayItem(field.name, idx)
                              }
                              className="text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        )
                      )}
                      <button
                        type="button"
                        onClick={() => addArrayItem(field.name)}
                        className="text-blue-600 text-sm"
                      >
                        + Add item
                      </button>
                    </div>
                  );
                }

                if (field.type === "file") {
                  return (
                    <div key={field.name}>
                      <label className="block font-medium capitalize mb-1">
                        {field.name}
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(field.name, e.target.files?.[0]!)
                        }
                        className="w-full border p-2 rounded"
                      />
                    </div>
                  );
                }

                return (
                  <div key={field.name}>
                    <label className="block font-medium capitalize mb-1">
                      {field.name}
                    </label>
                    <input
                      type={
                        field.type === "boolean"
                          ? "checkbox"
                          : field.type === "number"
                          ? "number"
                          : "text"
                      }
                      required={field.required}
                      placeholder={field.name}
                      value={
                        field.type === "boolean"
                          ? undefined
                          : form[field.name] || ""
                      }
                      checked={
                        field.type === "boolean"
                          ? form[field.name] || false
                          : undefined
                      }
                      onChange={(e) =>
                        handleChange(
                          field.name,
                          field.type === "boolean"
                            ? e.target.checked
                            : field.type === "number"
                            ? Number(e.target.value)
                            : e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 w-full px-4 py-2 rounded transition"
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.white,
              }}
            >
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCrud;
