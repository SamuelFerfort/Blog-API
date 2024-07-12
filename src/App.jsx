import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
