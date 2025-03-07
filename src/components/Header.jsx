import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

export default function Header() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-b-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <label className="text-xl font-bold text-gray-800">GrammarAI</label>
          <div>
            <button
              onClick={handleLogout}
              className="border border-red-400 text-red-400 p-2 text-sm rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
