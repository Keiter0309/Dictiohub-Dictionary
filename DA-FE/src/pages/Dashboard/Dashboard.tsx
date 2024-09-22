import React, { useState } from 'react';
import DashboardForm from "../../components/DashboardForm/DashboardForm";
import wordServices from "../../services/word/wordServices";
import '../../styles/global-style.css';
import Swal from "sweetalert2";
import { Spin } from "antd";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [delayedLoading, setDelayedLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (word: string) => {
    setDelayedLoading(false);
    setTimeout(() => setDelayedLoading(true), 2000);
    
    try {
      const response = await wordServices.searchWord(word);
      setSearchResult(response);
      setLoading(true);
    } catch (err: any) {
      console.error(err);
      showSwal(err.error, "error");
    } finally {
      setLoading(false);
      setDelayedLoading(false);
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
      {loading &&delayedLoading && (
        <div className="spin-container">
          <Spin size="large" className="custom-spin" />
        </div>
      )}
    </div>
  );
};

export default Dashboard;