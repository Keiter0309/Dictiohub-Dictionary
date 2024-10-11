import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardForm from '../../../components/Admin/Home/HomePageForm';
const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/admin/login");
        }
    }, [navigate]);
    return (
        <>
            <div className="">
                <AdminDashboardForm/>
            </div>
        </>
    )
}

export default Dashboard;