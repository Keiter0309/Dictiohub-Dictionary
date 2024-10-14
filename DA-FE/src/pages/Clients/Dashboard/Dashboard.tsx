import React, { useState } from 'react';
import DashboardForm from "../../../components/Client/DashboardForm/DashboardForm";
import wordServices from "../../../services/word/wordServices";
import '../../../styles/global-style.css';
import { message, Spin } from "antd";

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
      message.error(err.error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
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