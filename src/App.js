import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import AdminRegist from "./pages/Admin/AdminRegist";
import RequestResetPassword from "./pages/Admin/RequestResetPassword";

import ResetPasswordAdmin from "./pages/Admin/ResetPasswordAdmin";
import ReportsPage from "./pages/Admin/ReportsPage";
import AdminAccounts from "./pages/Admin/AdminAccounts";
import UserAccounts from "./pages/Admin/UserAccounts";
import Categories from "./pages/Admin/Categories";
import Report from "./pages/Admin/Report";
import AdminsDetail from "./pages/Admin/AdminDetail";
import AdminsDelete from "./components/Admin/AdminsDelete";
import UserDetail from "./pages/Admin/UserDetail";

//Users router
import Signup from "./pages/User/SignupUser";
import LoginUser from "./pages/User/LoginUser";
import UserReportsPage from "./pages/User/UserReportsPage";
import UserReport from "./pages/User/UserReport";
import UserEditPassword from "./pages/User/UserEditPassword";
import RequestResetPasswordUser from "./pages/User/RequestResetPasswordUser";
import ResetPasswordUser from "./pages/User/ResetPasswordUser";
import UserReportNew from "./pages/User/UserReportNew";

import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext } from "./context/appContext";

function App() {
  // フィルタ初期値
  const filterVal = {
    id: "",
    statusNotStarted: false,
    statusInProgress: false,
    statusClosed: false,
    subject: "",
    createdAtFrom: "",
    createdAtTo: "",
    updatedAtFrom: "",
    updatedAtTo: "",
  };
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [reportDetail, setReportDetail] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState([]);
  const [histories, setHistories] = useState([]);
  const [adminDetail, setAdminDetail] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [reportFilter, setReportFilter] = useState(filterVal);
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);

  const dateFormater = (dateStr) => {
    if (Date(dateStr)) {
      const date = new Date(dateStr);

      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    } else {
      return "9999-99-99 99:99:99";
    }
  };

  return (
    <AppContext.Provider
      value={{
        reports,
        setReports,
        reportDetail,
        setReportDetail,
        admins,
        setAdmins,
        users,
        setUsers,
        categories,
        setCategories,
        newCategory,
        setNewCategory,
        histories,
        setHistories,
        adminDetail,
        setAdminDetail,
        userDetail,
        setUserDetail,
        reportFilter,
        setReportFilter,
        filteredReports,
        setFilteredReports,
        dateFormater,
      }}
    >
      <BrowserRouter>
        <Routes>
          {/* user authentication route before logging in */}
          <Route path="/" element={<LoginUser />} />
          <Route path="/api/user/register" element={<Signup />} />
          <Route
            path="/api/user/password/email"
            element={<RequestResetPasswordUser />}
          />
          <Route path="/users/passwordreset" element={<ResetPasswordUser />} />

          {/* user router after logging in */}
          {user && (
            <>
              <Route path="/api/user/reports" element={<UserReportsPage />} />
              <Route path="/api/user/edit" element={<UserEditPassword />} />
              <Route path="/api/user/reports/:id" element={<UserReport />} />
              <Route path="/api/user/reports/new" element={<UserReportNew />} />
            </>
          )}

          {/* admin authentication route before logging in*/}
          <Route path="/api/admin" element={<LoginAdmin />} />
          <Route path="/api/admin/regist" element={<AdminRegist />} />
          <Route
            path="/auth/requestResetPassword"
            element={<RequestResetPassword />}
          />
          <Route
            path="/api/auth/passwordReset"
            element={<ResetPasswordAdmin />}
          />

          {/* admin route after logging in */}
          {admin && (
            <>
              <Route path="/api/admin/reports" element={<ReportsPage />} />
              <Route path="/api/admin/reports/:id" element={<Report />} />
              <Route path="/api/admin/all" element={<AdminAccounts />} />
              <Route path="/api/admin/users/all" element={<UserAccounts />} />
              <Route path="/api/admin/users/:id" element={<UserDetail />} />
              <Route path="/api/admin/category/all" element={<Categories />} />
              <Route path="/api/admin/:id" element={<AdminsDetail />} />
              <Route path="/api/admin/delete/:id" element={<AdminsDelete />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
