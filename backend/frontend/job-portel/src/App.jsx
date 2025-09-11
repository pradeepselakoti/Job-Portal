import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import ManageJobs from "./pages/Employer/ManageJobs";
import JobPostingForm from "./pages/Employer/JobPostingForm";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage";
import ApplicationViewer from "./pages/Employer/ApplicationViewer";
import JobDetails from "./pages/JobSeeker/JobDetails";
import JobSeekerDashboard from "./pages/JobSeeker/JobSeekerDashboard";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import UserProfile from "./pages/JobSeeker/UserProfile";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import LandingPage from "./pages/LandingPage/LandingPage";

const App = () => {
  return (
    <div>

      <Router>
        <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/find-jobs" element={<JobSeekerDashboard />} />
          <Route path="/jobs/:jobId" element={<JobDetails/>} />
          <Route path="/saved-jobs" element={<SavedJobs/>} />
          <Route path="/profile" element={<UserProfile />} />

          <Route element={<ProtectedRoutes requiredRole="employer" />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />}/>
          <Route path="/post-jobs" element={<JobPostingForm />}/>
          <Route path="/manage-jobs" element={<ManageJobs />}/>
          <Route path="/applicants" element={<ApplicationViewer />}/>
          <Route path="/company-profile" element={<EmployerProfilePage/>}/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  )
}

export default App