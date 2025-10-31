import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/Layout/AuthLayout";
import MainLayout from "./components/Layout/MainLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import BlogViewPage from "./pages/BlogViewPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route index element={ <HomePage />}></Route>
            <Route path="/blog-detail/:id" element={ <BlogViewPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
