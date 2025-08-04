import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";

// Lazy loaded components
const Home = lazy(() => import("./pages/Home"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const Hero = lazy(() => import("./components/Hero"));
const AdminMessages = lazy(() => import("./components/AdminMessages"));
const AdminProjects = lazy(() => import("./components/AdminProjects"));
const AddProject = lazy(() => import("./components/AddProject"));
const EditProject = lazy(() => import("./components/EditProject"));
const AdminProfile = lazy(() => import("./components/AdminProfile"));
const AdminSettings = lazy(() => import("./components/AdminSettings"));
const AdminNotifications = lazy(() => import("./components/AdminNotifications"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Hero />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/add" element={<AddProject />} />
              <Route path="projects/:id/edit" element={<EditProject />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="notifications" element={<AdminNotifications />} />
            </Route>

            {/* Catch-all (Optional: 404 Not Found page) */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
