import { LoadingOverlay } from '@/components/loadingOverlay';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import "./styles.css";

const CreateRoomPage = () => {

  const navigate = useNavigate() ;

  const [roomName, setRoomName] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('Medium');
  const [roundDuration, setRoundDuration] = useState(30);
  const [wordCategory, setWordCategory] = useState('General - Mixed topics');

  const [isLoading , setIsLoading] = useState(false) ;

  const handleCreateRoom = async () => {
    try {
      const token = localStorage.getItem("token"); // your JWT
      const diff = difficultyLevel.toLowerCase() ;

      setIsLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/room/create`,
        {
          roomName,
          difficultyLevel : diff,
          roundDuration,
          wordCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);

      const apiRoom = res.data._id;
      // redirect user to room page
      navigate(`/room/${apiRoom}`);
    } catch (err: any) {
      setIsLoading(false);
      console.error("Error creating room:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
          onClick={()=>navigate("/dashboard")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Room</h1>
          <p className="text-gray-600">Set up your perfect drawing game experience</p>
        </div>

        {/* Two Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card - Room Settings */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 !h-fit">
            {/* Settings Header */}
            <div className="flex items-center space-x-3 mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <h2 className="text-xl font-bold text-gray-800">Room Settings</h2>
            </div>

            {/* Basic Settings */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Game Settings */}
            <div className="mb-0">
              {/* Difficulty Level */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Difficulty Level</label>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Easy">Easy - Simple words</option>
                  <option value="Medium">Medium - Mixed difficulty</option>
                  <option value="Hard">Hard - Complex words</option>
                </select>
              </div>

              {/* Round Duration */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Round Duration: {roundDuration} seconds</label>
                <div className="relative">
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="10"
                    value={roundDuration}
                    onChange={(e) => setRoundDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                  />
                  <div className="flex justify-between text-gray-500 text-sm mt-2">
                    <span>30s</span>
                    <span>3 minutes</span>
                  </div>
                </div>
              </div>

              {/* Word Category */}
              <div className="mb-0">
                <label className="block text-gray-700 font-medium mb-2">Word Category</label>
                <input
                  type="text"
                  value={wordCategory}
                  onChange={(e) => setWordCategory(e.target.value)}
                  placeholder="Enter word category"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

          </div>

          {/* Right Card - Room Preview */}
          <div className='h-full w-full flex items-center'>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 w-full h-fit">
              {/* Preview Header */}
              <div className="flex items-center space-x-3 mb-6">
                <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <h2 className="text-xl font-bold text-gray-800">Room Preview</h2>
              </div>
              <p className="text-gray-600 mb-8">See how your room will look</p>

              {/* Room Card Preview */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100 mb-6">
                <h4 className="text-gray-800 font-bold text-xl mb-4">
                  {roomName || 'Untitled Room'}
                </h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-medium">{difficultyLevel}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 6l-1.41-1.41L12 10.17 8.41 6.59 7 8l5 5 5-5z"/>
                    </svg>
                    <span className="font-medium">{roundDuration}s rounds</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="font-medium">{wordCategory}</span>
                </div>

                {/* Mock player count */}
                <div className="flex items-center justify-between pt-4 border-t border-purple-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <span className="text-gray-600 text-sm">Players waiting</span>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Ready to start
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-8">
                <button 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all duration-200 border border-gray-200"
                  onClick={()=>navigate("/dashboard")}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRoom}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{isLoading ? 'Creating...' : 'Create & Start Game'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoadingOverlay show={isLoading} />

      <style>{`
        .range-slider {
          --progress: ${((roundDuration - 30) / (180 - 30)) * 100}%;
          background: linear-gradient(
            to right,
            #9333ea 0%,
            #9333ea var(--progress),
            #e5e7eb var(--progress),
            #e5e7eb 100%
          );
          height: 8px;
          border-radius: 20px;
          outline: none;
          transition: all 0.2s ease;
        }

        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 3px solid #9333ea;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(147, 51, 234, 0.3);
        }

        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 3px solid #9333ea;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .range-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(147, 51, 234, 0.3);
        }

        select option {
          background: #ffffff;
          color: #374151;
        }
      `}</style>
    </div>
  );
};

export default CreateRoomPage;