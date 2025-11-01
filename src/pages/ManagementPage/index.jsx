import UserTable from "@/components/UserTable";
import React from "react";

const ManagementPage = () => {
  return (
    <div>
      <div className="hero-title text-3xl sm:text-6xl font-semibold !sm:leading-[4rem] text-primary text-center mt-10 mb-8">
        🧩 User Management
      </div>
      < UserTable />
    </div>
  );
};

export default ManagementPage;
