import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, X, Eye, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [viewEntry, setViewEntry] = useState<any | null>(null);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [existingFiles, setExistingFiles] = useState<Record<string, string>>({});
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const headers = { Authorization: `Bearer ${token}` };

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiPath, { headers });
      setData(res.data);
      setTotalItems(res.data.length);
      
      // Reset to first page if current page is out of bounds
      const maxPages = Math.ceil(res.data.length / itemsPerPage);
      if (currentPage > maxPages && maxPages > 0) {
        setCurrentPage(1);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const openModal = (entry?: any) => {
    if (entry) {
      setForm(entry);
      setEditingId(entry._id);
      
      // Set existing files for editing mode
      const existingFileData: Record<string, string> = {};
      schema.forEach((field) => {
        if (field.type === "file" && entry[field.name]) {
          existingFileData[field.name] = entry[field.name];
        }
      });
      setExistingFiles(existingFileData);
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
      setExistingFiles({});
    }
    setFiles({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({});
    setEditingId(null);
    setFiles({});
    setExistingFiles({});
  };

  const handleChange = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
    // Remove existing file reference when new file is selected
    setExistingFiles((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const removeFile = (name: string) => {
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
    setExistingFiles((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
    // Also remove from form data
    setForm((prev) => ({ ...prev, [name]: null }));
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
    for (const field of schema) {
      if (field.required) {
        const isFile = field.type === "file";
        if (isFile) {
          // For file fields, check if there's either a new file or existing file
          const hasNewFile = files[field.name];
          const hasExistingFile = existingFiles[field.name];
          if (!hasNewFile && !hasExistingFile) {
            alert(`Please select a file for the required field: ${field.name}`);
            return;
          }
        } else {
          const hasValue = form[field.name];
          if (!hasValue || hasValue === "") {
            alert(`Please fill out the required field: ${field.name}`);
            return;
          }
        }
      }
    }

    const formData = new FormData();

    schema.forEach(({ name, type }) => {
      const value = form[name];
      if (type === "file") {
        // Only append new file if one is selected
        if (files[name]) {
          formData.append(name, files[name] as Blob);
        }
        // Note: If no new file is selected and we're editing, 
        // the existing file will remain unchanged on the server
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTotalItems(data.length);
  }, [data]);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <Plus className="w-5 h-5" /> Add New
        </button>
      </div>

      {/* Items per page selector */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {endIndex} of {totalItems} entries
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              {schema.map((field) => (
                <th key={field.name} className="px-6 py-4 font-semibold text-gray-700 capitalize">
                  {field.name}
                </th>
              ))}
              <th className="px-6 py-4 font-semibold text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={schema.length + 1} className="text-center p-8">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={schema.length + 1} className="text-center p-8 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((entry, index) => (
                <tr
                  key={entry._id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50 transition-colors duration-150`}
                >
                  {schema.map((field) => (
                    <td
                      key={field.name}
                      className="px-6 py-4 max-w-xs truncate"
                      title={entry[field.name]?.toString()}
                    >
                      {field.type === "array"
                        ? (entry[field.name] || []).join(", ")
                        : field.type === "file"
                        ? entry[field.name] ? (
                            <a
                              href={entry[field.name]}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              View File
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )
                        : entry[field.name]?.toString() || <span className="text-gray-400">-</span>}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setViewEntry(entry)}
                        className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-colors duration-150"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal(entry)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors duration-150"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors duration-150"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-lg h-[80vh] bg-white p-6 rounded-xl shadow-2xl relative flex flex-col">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              {editingId ? "Edit Entry" : "Add New Entry"}
            </h3>
            <div className="overflow-y-auto pr-2 flex-1 space-y-4 custom-scrollbar">
              {schema.map((field) => (
                <div key={field.name}>
                  <label className="block font-medium capitalize mb-2 text-gray-700">
                    {field.name}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === "file" ? (
                    <div className="space-y-2">
                      {/* Show existing file if in edit mode */}
                      {existingFiles[field.name] && (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Current file:</span>
                              <a
                                href={existingFiles[field.name]}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline text-sm"
                              >
                                View Current File
                              </a>
                            </div>
                            <button
                              onClick={() => removeFile(field.name)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                      {/* File input - always show, but with different label based on context */}
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          {existingFiles[field.name] ? "Replace with new file:" : "Select file:"}
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleFileChange(field.name, e.target.files?.[0]!)
                          }
                          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      {/* Show selected new file */}
                      {files[field.name] && (
                        <div className="text-sm text-green-600">
                          New file selected: {files[field.name]?.name}
                        </div>
                      )}
                    </div>
                  ) : field.type === "array" ? (
                    <>
                      {(form[field.name] || []).map((item: string, idx: number) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(field.name, e.target.value, idx)
                            }
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => removeArrayItem(field.name, idx)}
                            className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-150"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addArrayItem(field.name)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        + Add item
                      </button>
                    </>
                  ) : field.type === "boolean" ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={form[field.name] || false}
                        onChange={(e) =>
                          handleChange(field.name, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {form[field.name] ? 'Yes' : 'No'}
                      </span>
                    </div>
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      value={form[field.name] || ""}
                      onChange={(e) =>
                        handleChange(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              {editingId ? "Update Entry" : "Create Entry"}
            </button>
          </div>
        </div>
      )}

      {/* View Modal - Fixed size with vertical scrolling */}
      {viewEntry && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-lg h-[80vh] bg-white p-6 rounded-xl shadow-2xl relative flex flex-col">
            <button
              onClick={() => setViewEntry(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              View Entry Details
            </h3>
            <div className="overflow-y-auto pr-2 flex-1 space-y-4 custom-scrollbar">
              {schema.map((field) => (
                <div key={field.name} className="border-b border-gray-100 pb-3">
                  <p className="text-sm text-gray-500 capitalize font-medium mb-1">
                    {field.name}
                  </p>
                  <div className="font-medium text-gray-900">
                    {field.type === "array"
                      ? (viewEntry[field.name] || []).length > 0 
                        ? (viewEntry[field.name] || []).join(", ")
                        : <span className="text-gray-400 italic">No items</span>
                      : field.type === "file" && viewEntry[field.name] ? (
                          <a
                            href={viewEntry[field.name]}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            View File
                          </a>
                        ) : field.type === "boolean" ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            viewEntry[field.name] 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {viewEntry[field.name] ? 'Yes' : 'No'}
                          </span>
                        ) : viewEntry[field.name]?.toString() || (
                          <span className="text-gray-400 italic">No data</span>
                        )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
        `
      }} />
    </div>
  );
};

export default GenericCrud;