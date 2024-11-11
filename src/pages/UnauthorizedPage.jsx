import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
      <p className="mt-2">You do not have permission to view this page.</p>
    </div>
  );
};

export default UnauthorizedPage;
