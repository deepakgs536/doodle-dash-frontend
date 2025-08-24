import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type DashboardPageProps = {
  setToken: (token: string | null) => void;
};

type User = {
  username: string;
  email: string;
};

export const DashboardPage = ({ setToken }: DashboardPageProps) => {

  const navigate = useNavigate() ;

  const [showProfileModal, setShowProfileModal] = useState(false);

  const recentGames = [
    { gameid: 1, gameName: 'Forest Adventure', players: 6, position: 1, points: 850 },
    { gameid: 2, gameName: 'Ocean Mystery', players: 4, position: 3, points: 320 },
    { gameid: 3, gameName: 'Space Quest', players: 8, position: 1, points: 1200 }
  ];

  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // or from zustand
        const res = await axios.get("https://doodle-app-backend.onrender.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6L13.5 7.5C13.1 7.9 12.6 8 12 8S10.9 7.9 10.5 7.5L9 6V4L3 7V9L9 12L15 9V10.5L12 13L9 10.5V12L15 15L21 12V10.5L18 9L21 9Z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">DrawGuess</h1>
            <p className="text-sm sm:text-base text-gray-600">Welcome back, {user?.username}!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Logout Button */}
          <button className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg px-3 py-2 transition-all duration-200 shadow-sm hover:cursor-pointer"
          onClick={() => {localStorage.removeItem("token");
            localStorage.removeItem("_id");
            localStorage.removeItem("username");
            setToken("");
            navigate("/");
          }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm sm:text-base font-medium hidden sm:inline">Logout</span>
          </button>

          {/* Profile Icon */}
            <img 
              src="https://www.shutterstock.com/image-vector/beautiful-anime-girl-landscape-wallpaper-600nw-2321703851.jpg"
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover hover:cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            />
          
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Create Room Card */}
        <div 
          className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-102 hover:shadow-xl transition-all duration-200 shadow-lg"
          onClick={() => navigate("/createRoom")}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Create Room</h2>
              <p className="text-sm sm:text-base text-purple-100">Start a new drawing game</p>
            </div>
          </div>
        </div>

        {/* Join Room Card */}
        <div 
          className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white cursor-pointer hover:scale-102 hover:shadow-xl transition-all duration-200 shadow-lg"
          onClick={() => navigate("/joinRoom")}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.988 2.988 0 0 0 17.07 7c-.8 0-1.54.37-2.01.97l-.95 1.38c-.26.38-.77.58-1.25.48l-2.15-.43c-.67-.13-1.31.27-1.44.94s.27 1.31.94 1.44l1.63.33-1.13 1.64.91.66 1.71-2.48c.38-.55 1.05-.73 1.65-.46.59.26.96.87.96 1.53V22h2zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10.5s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5c0-.8-.69-1.5-1.5-1.5S6 8.7 6 9.5V15H4v7h3.5z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Join Room</h2>
              <p className="text-sm sm:text-base text-blue-100">Enter a room with code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex mb-4">
        <button className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-purple-600 text-white shadow-md text-sm sm:text-base">
          Game History
        </button>
      </div>

      {/* Recent Games Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div className="mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Recent Games</h3>
          <p className="text-sm sm:text-base text-gray-600">Your last few drawing sessions</p>
        </div>

        <div className="space-y-3">
          {recentGames.map((game, index) => (
            <div
              key={index}
              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-center justify-between transition-all duration-200 border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {game.position === 1 && (
                    <svg className="w-6 h-6 text-yellow-400 animate-pulse drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))'}}>
                      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/>
                      <circle cx="12" cy="12" r="2" fill="rgba(251, 191, 36, 0.3)"/>
                    </svg>
                  )}
                  <span className="text-base sm:text-lg font-semibold text-gray-700">#{game.position}</span>
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-gray-800">{game.gameName}</h4>
                  <p className="text-sm text-gray-600">{game.players} players</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg sm:text-xl font-bold text-gray-800">{game.points} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full transform scale-100 transition-all duration-200 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Profile</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-center">
              <img
                src="https://www.shutterstock.com/image-vector/beautiful-anime-girl-landscape-wallpaper-600nw-2321703851.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-purple-100 shadow-lg"
              />
            <div className="flex justify-center space-x-2">
              <h4 className="text-lg sm:text-xl font-bold text-gray-800">{user?.username}</h4>
            </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{user?.email}</p>
              
              <div className="space-y-2">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-md text-sm sm:text-base">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;