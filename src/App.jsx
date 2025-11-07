import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import BlogViewPage from "./pages/BlogViewPage";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./contexts/authContext";
import ManagementPage from "./pages/ManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateBlog from "./components/CreateBlog";
import CreateBlogPage from "./pages/CreateBlogPage";
import MyPostPage from "./pages/MyPostPage";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/">
              <Route path="/login" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/blog-detail/:id" element={<BlogViewPage />} />
              <Route path="/my-post" element={<MyPostPage />} />
              <Route
                path="/user-management"
                element={
                  <ProtectedRoute role="admin">
                    <ManagementPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/create-blog" element={<CreateBlogPage />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
