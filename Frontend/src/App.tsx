import { Route, Routes } from "react-router";
import HomePage from "./pages/homepage";
import Navbar from "./components/navbar";
import NotFoundPage from "./pages/notfoundpage";
import LoginPage from "./pages/loginpage";
import Protected from "./components/protected";
import SignUpPage from "./pages/signinpage";
import SyncUser from "./components/syncuser";

const App = () => {
  return (
    <div className="min-h-screen mx-auto">
      <Navbar />
      <div className="p-8">
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <HomePage />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sync-user" element={<SyncUser />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
