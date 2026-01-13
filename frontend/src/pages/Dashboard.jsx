import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* NAVBAR */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          SurveyHub Dashboard
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CREATE POLL */}
        <div
          onClick={() => navigate("/create-poll")}
          className="card cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">
            ➕ Create Poll
          </h2>
          <p className="text-gray-600">
            Create new polls with multiple choices and expiry time.
          </p>
        </div>

        {/* VIEW POLLS */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">
            📊 View Polls
          </h2>
          <p className="text-gray-600">
            Browse active, closed and upcoming polls.
          </p>
        </div>

        {/* RESULTS */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">
            📈 Live Results
          </h2>
          <p className="text-gray-600">
            See real-time voting results using charts.
          </p>
        </div>
      </div>
    </div>
  );
}
