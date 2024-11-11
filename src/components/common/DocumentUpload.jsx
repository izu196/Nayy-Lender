import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaFile, FaTrash } from "react-icons/fa";

const DocumentUpload = ({ documents, onUpdate }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append("documents", file);
      });
      onUpdate("documents", formData);
    },
    [onUpdate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: true,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
          isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select files"}
        </p>
      </div>

      {documents?.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FaFile className="text-gray-400" />
                <span>{doc.name}</span>
              </div>
              <button
                onClick={() => onUpdate("removeDocument", doc.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
