import { showToast } from '@/components/toastComp';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const JoinRoomPage = () => {

  const navigate = useNavigate() ;

  const [roomCode, setRoomCode] = useState('');

  // Example frontend call
  const handleFindRoom = async () => {

    const accessToken = localStorage.getItem("token");

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/room/join`,
      { roomCode },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    
    navigate(`/room/${res.data._id}`);
    } catch (err: unknown) {
        const error = err as { response?: { data?: { error?: string } } };
        showToast("error", error.response?.data?.error || "unknown error");
      }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200" onClick={() => navigate("/dashboard")}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Dashboard</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Join Room</h1>
          <p className="text-gray-600">Enter a room code to join an existing game</p>
        </div>

        {/* Join Room Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          {/* Room Code Section Header */}
          <div className="flex items-center space-x-3 mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7z"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-800">Room Code</h2>
          </div>
          <p className="text-gray-600 mb-8">Ask the room host for the 6-character room code</p>

          {/* Enter Room Code */}
          <div className="mb-8 w-full">
            <label className="block text-gray-700 font-medium mb-2">Enter Room Code</label>
            <div className="flex space-x-4 w-full">
              <div className="relative !w-[80%]">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">#</span>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  maxLength={6}
                  className="pl-9 w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleFindRoom}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 hover:cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Find</span>
              </button>
            </div>
          </div>

          {/* Need Help Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#ad46ff] rounded-full"></div>
                <p className="text-gray-600">Room codes are 6 characters long and case-insensitive</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#ad46ff] rounded-full"></div>
                <p className="text-gray-600">Ask the room host to share the code with you</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#ad46ff] rounded-full"></div>
                <p className="text-gray-600">You can only join rooms that are waiting for players</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JoinRoomPage;