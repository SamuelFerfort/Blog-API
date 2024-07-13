import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-900 text-gray-200 ">
        <Header />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;