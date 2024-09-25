import React, { useState } from 'react';
import DashboardForm from "../../../components/Client/DashboardForm/DashboardForm";
import wordServices from "../../../services/word/wordServices";
import '../../../styles/global-style.css';
import Swal from "sweetalert2";
import { Spin } from "antd";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (word: string) => {
    try {
      const response = await wordServices.searchWord(word);
      setSearchResult(response);
      setLoading(true);
    } catch (err: any) {
      console.error(err);
      showSwal(err.error, "error");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const showSwal = (message: string, icon: "success" | "error") => {
    Swal.fire({
      toast: true,
      text: message,
      icon: icon,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <div>
      <DashboardForm onSubmit={handleSearch} searchResult={searchResult} />
      {loading && (
        <div className="spin-container">
          <Spin size="large" className="custom-spin" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;