import { useRef, useState, useEffect } from "react";
import { Send, MessageCircle, Crown, Play, Square, Wrench } from 'lucide-react';
import { useNavigate, useParams } from "react-router";
import "./styles.css";
import { io } from "socket.io-client";
import { showToast } from "./toastComp";
import { VisibilityIcon, VisibilityOffIcon } from "../../public";
import ShowResults from "./showResult";
import { LoadingOverlay } from "./loadingOverlay";

const URL = import.meta.env.VITE_BACKEND_URL;

export const socket = io(URL, {
  withCredentials: true,
  transports: ["websocket"],
});

interface Participant {
  userId: string;
  username: string;
  score: number;
  isHost: boolean;
}

interface Chat {
  id: string;
  userId: string;
  username: string;
  message: string;
}

interface Answer {
  userId: string;
  message: string;
}

interface Message {
  userId?: string;
  username: string;
  message: string;
}

interface FormattedMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
}

interface Room {
  _id?: string;
  roomId?: string;
  roomName?: string;
  roundDuration?: number;
  currentTurnUserId?: string;
  participants?: Participant[];
  turn?: string;
  hostId?: string;
  currentWord?: string;
  wordCategory?: string;
  isStarted?: boolean;
  answers?: Answer[];
}

type DrawingEvent =
  | { type: "start"; x: number; y: number; mode: "draw" | "erase"; color: string; lineWidth: number }
  | { type: "draw"; x: number; y: number; mode: "draw" | "erase"; color: string; lineWidth: number  }
  | { type: "end" }
  | { type: "clear" };

const DrawingGameInterface = () => {
  const navigate = useNavigate();
  
  // Drawing states
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [toolsPanelOpen, setToolsPanelOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<"draw" | "erase">("draw");
  const [selectedColor, setSelectedColor] = useState("#000000");
  
  const [answer, setAnswer] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Chat[]>([]);
  
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [gotAnswer , setGotAnswer] = useState<boolean>(false);
  const [isVisible , setIsVisible] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [topParticipants, setTopParticipants] = useState([]);
  const [isLoading , setIsLoading] = useState<boolean>(false);
  
  const { roomId } = useParams();
  const userId = localStorage.getItem("_id");
  const username = localStorage.getItem("username");
  
  const colors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
    "#FFA500", "#800080", "#FFC0CB", "#808080", "#A52A2A", "#00FFFF", "#008000"
  ];

  // Drawing functions - FIXED VERSION
  const isMyTurn = room?.currentTurnUserId === userId;
  const currentDrawer = room?.participants?.find(p => p.userId === room?.turn);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Socket event handlers

  useEffect(() => {
  const canvas = canvasRef.current!;
  const ctx = canvas.getContext("2d")!;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctxRef.current = ctx;

  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  ctx.scale(ratio, ratio);

  socket.on("drawing", (data: DrawingEvent) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    if (data.type === "start") {
      ctx.beginPath();
      ctx.moveTo(data.x, data.y);
    } else if (data.type === "draw") {
      ctx.strokeStyle = data.color;
      ctx.lineWidth = data.lineWidth / ratio; // normalize for DPI
      ctx.lineTo(data.x, data.y);
      ctx.stroke();
    } else if (data.type === "end") {
      ctx.closePath();
    } else if (data.type === "clear" && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  });

  return () => {
    socket.off("drawing");
  };
}, []);

const startDrawing = (e: React.MouseEvent) => {
  const rect = canvasRef.current?.getBoundingClientRect();
  if (!rect || !ctxRef.current || !isMyTurn) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  setIsDrawing(true);

  const ratio = window.devicePixelRatio || 1;
  const lineWidth = mode === "erase" ? 20 : 2;
  const color = mode === "erase" ? "#ffffff" : selectedColor;

  ctxRef.current.strokeStyle = color;
  ctxRef.current.lineWidth = lineWidth / ratio;

  ctxRef.current.beginPath();
  ctxRef.current.moveTo(x, y);

  socket.emit("drawing", { type: "start", x, y, mode, lineWidth, color });
};

const draw = (e: React.MouseEvent) => {
  if (!isDrawing || !ctxRef.current || !isMyTurn) return;

  const rect = canvasRef.current?.getBoundingClientRect();
  if (!rect) return;

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctxRef.current.lineTo(x, y);
  ctxRef.current.stroke();

  const lineWidth = mode === "erase" ? 20 : 2;
  const color = mode === "erase" ? "#ffffff" : selectedColor;

  socket.emit("drawing", { roomId, type: "draw", x, y, mode, lineWidth, color });
};

const stopDrawing = () => {
  if (!isDrawing) return;
  setIsDrawing(false);
  ctxRef.current?.closePath();
  socket.emit("drawing", { type: "end" });
};

const clearCanvas = () => {
  if (!ctxRef.current || !canvasRef.current) return;
  ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  socket.emit("drawing", { type: "clear" });
};

  const hasJoined = useRef(false);

  useEffect(() => {
    if (!roomId || !userId || !username) return;

    if (!hasJoined.current) {
      setIsLoading(true);
      socket.emit("joinRoom", { roomId, userId, username });
      hasJoined.current = true;
      setIsLoading(false);
    }

    socket.on("roomData", (roomData) => {
      setRoom(roomData);
    });

    socket.on("playerJoined", () => {
      
    });

    socket.on("chatHistory", (history) => {
      if (!history) {
        setMessages([]);
        return;
      }

    const formatted: FormattedMessage[] = history.map((m: Message, index: number) => ({
      id: `${Date.now()}-${index}`,
      userId: m.userId || "",
      username: m.username,
      message: m.message,
    }));
    setMessages(formatted);
    });

    socket.on("canvasHistory", (history) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      history.forEach((event: any) => {
        if (event.type === "start") {
          ctx.beginPath();                     // reset path
          ctx.moveTo(event.x, event.y);        // jump pen to start
        } else if (event.type === "draw") {
          ctx.strokeStyle = event.color || "#000000";
          ctx.lineWidth = event.lineWidth || 2;
          ctx.lineTo(event.x, event.y);
          ctx.stroke();
        } else if (event.type === "end") {
          ctx.stroke();                        // finalize stroke
          ctx.closePath();                     // close path cleanly
          ctx.beginPath();                     // prepare new path
        }
      });
    });

    socket.on("showAnswer", (ans : boolean) => {
      setShowAnswer(ans) ;
    });

    socket.on("gotAnswer" , (ans : boolean) => {
      setGotAnswer(ans) ;
    })

    socket.on("receiveMessage", (msg) => {
      setMessages(prev => [
        ...prev,
        { 
          id: `${Date.now()}-${Math.random()}`,
          userId: msg.userId || "", 
          username: msg.user, 
          message: msg.message 
        }
      ]);
    });

    socket.on("canvasCleared", () => {
      clearCanvas();
    });

    socket.on("correctAnswer", (data) => {
      setMessages(prev => [
        ...prev,
        { 
          id: `${Date.now()}-${Math.random()}`,
          userId: "1", 
          username: "System", 
          message: `${data.username} guessed correctly! +${data.points} points` 
        }
      ]);
    });

    socket.on("timeUp", () => {
      setTimeLeft(0);
    });

    socket.on("timerUpdate", (timeLeft: number) => {
      setTimeLeft(timeLeft);
    });

    socket.on("showResult", (data) => {
      // Get top 3 participants sorted by score
      setTopParticipants(
        data?.participants
          .sort((a: Participant, b: Participant) => b?.score - a?.score)
          .slice(0, 3) || []
      );
      setShowResults(true);
      
      // Wait 10 seconds before navigating
      setTimeout(() => {
        setShowResults(false);
        navigate("/dashboard");
      }, 10000); // 10000 ms = 10s
    });


    socket.on("errorMessage", (msg) => {
      setIsLoading(false);
      if(msg === "Room not found"){
        showToast("error" , msg);
        navigate("/dashboard");
      }
      else showToast("error" , msg);
    });

    return () => {
      socket.off("roomData");
      socket.off("chatHistory");
      socket.off("canvasHistory");  
      socket.off("receiveMessage");
      socket.off("gameStarted");
      socket.off("gameEnded");
      socket.off("turnChanged");
      socket.off("drawingData");
      socket.off("canvasCleared");
      socket.off("correctAnswer");
      socket.off("timeUp");
      socket.off("errorMessage");
      socket.off("timerUpdate");
      socket.off("showResult");
    };
  }, [roomId, userId, username, navigate]);

  // Time formatting
  const formatTime = (seconds : number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Game control functions
  const handleStartGame = () => {
    if (!isHost) return;
    socket.emit("startGame", { roomId });
  };

  const handleStopGame = () => {
    if (!isHost) return;
    socket.emit("endGame", { roomId });
  };

  const handleLeaveGame = () => {
    socket.emit("leaveRoom", { roomId, userId, username });
    navigate("/dashboard");
  };

  // Answer submission
  const handleAnswerSubmit = () => {
    if (!answer.trim() || !room?.isStarted || isMyTurn) return;

    socket.emit("submitAnswer", {
      roomId,
      userId,
      answer: answer.trim()
    });
    
    setAnswer("");
  };

  // Chat functions
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    socket.emit("sendChat", {
      roomId,
      userId,
      user: username,
      message: chatMessage,
    });
    
    setChatMessage("");
  };

  // Save/load drawing preferences
  const saveDrawingPreferences = () => {
    localStorage.setItem('drawingMode', mode);
    localStorage.setItem('strokeWidth', strokeWidth.toString());
    localStorage.setItem('selectedColor', selectedColor);
  };

  const loadDrawingPreferences = () => {
    const savedMode = localStorage.getItem('drawingMode');
    const savedWidth = localStorage.getItem('strokeWidth');
    const savedColor = localStorage.getItem('selectedColor');
    
    if (savedMode && (savedMode === "draw" || savedMode === "erase")) {
      setMode(savedMode);
    }
    if (savedWidth) {
      const width = parseInt(savedWidth);
      if (width >= 1 && width <= 30) {
        setStrokeWidth(width);
      }
    }
    if (savedColor && colors.includes(savedColor)) {
      setSelectedColor(savedColor);
    }
  };

  // Load preferences on mount
  useEffect(() => {
    loadDrawingPreferences();
  }, []);

  // Save preferences when they change
  useEffect(() => {
    saveDrawingPreferences();
  }, [mode, strokeWidth, selectedColor]);

  // // Keyboard shortcuts
  // useEffect(() => {
  //   const handleKeyPress = (e) => {
  //     if (!room?.isStarted || !isMyTurn) return;
      
  //     switch (e.key.toLowerCase()) {
  //       case 'd':
  //         if (e.ctrlKey || e.metaKey) {
  //           e.preventDefault();
  //           setDrawingMode("draw");
  //         }
  //         break;
  //       case 'e':
  //         if (e.ctrlKey || e.metaKey) {
  //           e.preventDefault();
  //           setDrawingMode("erase");
  //         }
  //         break;
  //       case 'c':
  //         if (e.ctrlKey || e.metaKey) {
  //           e.preventDefault();
  //           clearCanvas();
  //         }
  //         break;
  //       case 't':
  //         if (e.ctrlKey || e.metaKey) {
  //           e.preventDefault();
  //           toggleMode();
  //         }
  //         break;
  //       case '[':
  //         if (strokeWidth > 1) {
  //           setStrokeWidth(prev => prev - 1);
  //         }
  //         break;
  //       case ']':
  //         if (strokeWidth < 30) {
  //           setStrokeWidth(prev => prev + 1);
  //         }
  //         break;
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyPress);
  //   return () => window.removeEventListener('keydown', handleKeyPress);
  // }, [room, isMyTurn, mode, strokeWidth]);

  // Touch support for mobile
  const handleTouchStart = (e: any) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    if (!canvasRef.current) return; 
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  const handleTouchMove = (e: any) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    if (!canvasRef.current) return; 
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  const handleTouchEnd = (e: any) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent("mouseup", {});
    if (!canvasRef.current) return; 
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  // Add touch event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Game state helpers
  const isHost = room?.hostId === userId;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket.connected) {
        socket.emit("leaveRoom", { roomId, userId, username });
      }
    };
  }, [roomId, userId, username]);

  return (
    <div className="flex md:h-[99vh] bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 text-gray-800">
      {/* Left Sidebar - Players */}
      <div className="w-[20%] bg-white bg-opacity-80 backdrop-blur-sm border-r border-purple-200 shadow-lg p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {room?.roomName?.charAt(0)?.toUpperCase() || 'R'}
              </span>
            </div>
            <div>
              <div className="font-semibold text-gray-800">{room?.roomName || 'Game Room'}</div>
              <div className="text-xs font-semibold text-purple-600">
                Room Code: {isVisible ? room?.roomId : "******"}

                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none hover:cursor-pointer h-fit"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <VisibilityIcon className="w-4 h-4 fill-[#7b738c] mx-2" />
                  ) : (
                    <VisibilityOffIcon className="w-4 h-4 fill-[#7b738c] mx-2" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Game Status Indicator */}
          <div className={`text-center mb-3 py-2 px-3 rounded-lg text-sm font-medium ${
            room?.isStarted 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
          }`}>
            {room?.isStarted ? '🎮 Game In Progress' : '⏳ Waiting to Start'}
          </div>
          
          {/* Current Turn Indicator */}
          {room?.isStarted && currentDrawer && (
            <div className="text-center mb-3 py-1 px-2 rounded-md text-xs bg-pink-100 text-pink-700 border border-pink-200">
              {isMyTurn ? "Your turn to draw!" : `${currentDrawer.username} is drawing`}
            </div>
          )}
          
          {/* Host Controls */}
          <div className="text-right text-sm space-x-2">
            {isHost ? (
              <>
                {!room?.isStarted ? (
                  <button 
                    className="py-1 pb-1.5 px-3 rounded-md text-xs bg-green-500 hover:bg-green-400 transition duration-200 text-white font-semibold hover:cursor-pointer flex items-center gap-1 inline-flex"
                    onClick={handleStartGame}
                  >
                    <Play size={12} />
                    Start Game
                  </button>
                ) : (
                  <button 
                    className="py-1 pb-1.5 px-3 rounded-md text-xs bg-orange-500 hover:bg-orange-400 transition duration-200 text-white font-semibold hover:cursor-pointer flex items-center gap-1 inline-flex"
                    onClick={handleStopGame}
                  >
                    <Square size={12} />
                    Stop Game
                  </button>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-500 italic">
                Only host can control game
              </div>
            )}
            <button 
              className="py-1 pb-1.5 px-3 rounded-md text-xs bg-red-500 hover:bg-red-400 transition duration-200 text-white font-semibold hover:cursor-pointer"
              onClick={handleLeaveGame}
            >
              Leave
            </button>
          </div>
        </div>

        {/* Players List */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-purple-700 text-sm">
            Players {room?.participants?.length || 0}
          </h3>
          <div className="h-[calc(100vh-300px)] space-y-3 overflow-y-auto scrollbar-hide">
            {[...(room?.participants || [])]
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .map((player, index) => (
              <div
                key={player.userId}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  room?.isStarted && player.userId === room?.turn
                    ? "bg-pink-100 border border-pink-300"
                    : "bg-gray-50 hover:bg-gray-100"
                } transition-colors`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm relative ${
                    room?.isStarted && player.userId === room?.turn
                      ? "bg-pink-500"
                      : index === 0
                      ? "bg-orange-500"
                      : index === 1
                      ? "bg-blue-500"
                      : index === 2
                      ? "bg-green-500"
                      : "bg-purple-500"
                  }`}
                >
                  {player.username ? player.username.charAt(0).toUpperCase() : "?"}
                  {index === 0 && (
                    <Crown
                      size={16}
                      className="absolute -top-1 -right-1 text-yellow-500 bg-white rounded-full p-0.5 
                                drop-shadow-[0_0_6px_rgb(250,204,21)]"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 text-sm truncate flex items-center gap-1">
                    {player.username}
                    {player.userId === room?.hostId && (
                      <span className="text-xs text-yellow-600">(Host)</span>
                    )}
                    {room?.isStarted && player.userId === room?.turn && (
                      <span className="text-xs text-pink-600 font-bold">✏️</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">{player.score || 0} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col">
        {/* Game Header with Timer */}
        <div className="p-4 h-[78px] bg-white bg-opacity-60 backdrop-blur-sm border-b border-purple-200 shadow-sm">
          <div className="flex justify-between items-center">
            {/* Game Status */}
            <div className="text-sm text-gray-600">
              {!room?.isStarted ? (
                <span className="text-yellow-600 font-medium">
                  Waiting for host to start the game...
                </span>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-medium">
                    Game in progress
                  </span>
                </div>
              )}
            </div>
            
            {/* Timer - only show when game is active */}
            <div className="bg-purple-100 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm border border-purple-200">
              <div className="text-center">
                <div className={`text-sm font-bold ${
                  timeLeft <= 10 ? 'text-red-600' : 'text-purple-800'
                }`}>
                  {formatTime(room?.isStarted && !gotAnswer ? timeLeft : 0)}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar - only show when game is active */}
          <div className="mt-2 w-full bg-purple-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                timeLeft <= 10 ? 'bg-red-500' : 'bg-purple-600'
              }`}
              style={{ width: `${((room?.isStarted && !gotAnswer ? timeLeft : 0) / (room?.roundDuration || 60)) * 100}%` }}
            />
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-6 relative">
          <div className="relative w-full h-full">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className={`w-full h-full border-2 border-purple-200 rounded-lg shadow-lg bg-white ${
                !room?.isStarted || !isMyTurn ? 'cursor-not-allowed opacity-75' : 'cursor-crosshair'
              }`}
              style={{ 
                filter: !room?.isStarted || !isMyTurn ? 'grayscale(30%)' : 'none' 
              }}
            />
            
            {/* Game not started overlay */}
            {!room?.isStarted && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎨</div>
                  <div className="text-xl font-semibold text-gray-700 mb-2">Ready to Play!</div>
                  <div className="text-sm text-gray-500">
                    {isHost ? 'Click "Start Game" to begin' : 'Waiting for host to start the game'}
                  </div>
                </div>
              </div>
            )}

            {/* Show Answer Overlay */}
            {showAnswer && room?.currentWord && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-70 rounded-lg backdrop-blur-sm z-500">
                <div className="rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center transform">
                  {/* Answer Icon */}
                  <div className="text-6xl mb-4">💡</div>
                  
                  {/* Answer Title */}
                  <div className="text-xl font-bold text-gray-800 mb-2">The Answer Was:</div>
                  
                  {/* The Answer */}
                  <div className="text-3xl font-bold text-pink-600 mb-1 tracking-wide uppercase">
                    {room?.currentWord}
                  </div>
                  
                  {/* Decorative line */}
                  <div className="w-24 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto mb-4 rounded-full"></div>
                  
                  {/* Additional info */}
                  <div className="text-sm text-gray-500">
                    {isMyTurn ? "You were drawing this word" : "Hope you guessed it right!"}
                  </div>
                </div>
              </div>
            )}
            
            {/* Word Space */}
            {room?.isStarted && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-300 px-6 py-3 rounded-lg shadow-lg">
                <div className="text-lg font-semibold tracking-widest text-yellow-900 flex gap-2">
                  {(room?.currentWord || "").split("").map((char, idx) =>
                    char === " " ? (
                      <span key={idx} className="mx-2"> </span>
                    ) : (
                      <span
                        key={idx}
                        className="border-b-2 border-yellow-800 min-w-[20px] text-center"
                      >
                        {isMyTurn ? char : " "} 
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Tools Panel Toggle Button - only show when it's player's turn and game started */}
            {room?.isStarted && isMyTurn && !toolsPanelOpen && (
              <button
                onClick={() => setToolsPanelOpen(true)}
                className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
              >
                <Wrench size={22} />
              </button>
            )}
            
            {/* Tools Panel Toggle Button - only show when it's player's turn and game started */}
            {room?.isStarted && isMyTurn && !toolsPanelOpen && (
              <button
                onClick={() => setToolsPanelOpen(true)}
                className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg transition-all hover:cursor-pointer"
              >
                <Wrench size={22} />
              </button>
            )}

            {/* Tools Panel */}
            {toolsPanelOpen && room?.isStarted && isMyTurn && (
              <div className="absolute bottom-4 right-4 bg-white backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl p-4 space-y-4 w-64">
                {/* Close Button */}
                <button
                  onClick={() => setToolsPanelOpen(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>

                {/* Tools */}
                <div>
                  <div className="text-sm font-medium mb-2 text-gray-700">Tools</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode("draw")}
                      className={`p-3 rounded-lg transition-all ${mode === "draw" ? 'bg-pink-500 text-white scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75l11.03-11.03-3.75-3.75L3 17.25zM20.71 5.63l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setMode("erase")}
                      className={`p-3 rounded-lg transition-all ${mode === "erase" ? 'bg-pink-500 text-white scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84L11.6 5.37c.94-.94 2.23-.94 3.17 0l1.47 1.47zm-2.83 2.83L5.64 14.16l2.83 2.83 7.78-7.78-2.84-2.82z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <div className="text-sm font-medium mb-2 text-gray-700">Colors</div>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${selectedColor === color ? 'border-pink-500 scale-110 shadow-md' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Answer Section */}
        <div className="p-4 bg-white bg-opacity-60 backdrop-blur-sm border-t border-purple-200 shadow-sm">
          <div className="w-full mx-auto">
            <div className="bg-purple-50 backdrop-blur-sm rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                    placeholder={
                      !room?.isStarted 
                        ? "Game not started yet..."
                        : (isMyTurn)
                          ? "You are drawing..." 
                          : (gotAnswer) ?
                          "The Answer is Correct"
                          : "Type your guess here..."
                    }
                    disabled={!room?.isStarted || isMyTurn || gotAnswer}
                    className={`w-full px-4 py-3 rounded-lg bg-white border border-purple-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 ${
                      !room?.isStarted || isMyTurn || gotAnswer ? 'cursor-not-allowed opacity-50 bg-gray-100' : ''
                    }`}
                  />
                </div>
                <button
                  onClick={handleAnswerSubmit}
                  disabled={!room?.isStarted || isMyTurn || !answer.trim()}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    !room?.isStarted || isMyTurn || !answer.trim() 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-pink-500 hover:bg-pink-600 text-white'
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Chat */}
      <div className="w-[25%] bg-white bg-opacity-80 backdrop-blur-sm border-l border-purple-200 shadow-lg flex flex-col">
        <div className="p-4 border-b border-purple-200">
          <h3 className="font-semibold text-purple-700 flex items-center gap-2">
            <MessageCircle size={20} />
            Chat
          </h3>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
          {messages.map(msg => (
            <div key={msg.id} className="flex justify-start mb-3">
              <div className="w-full">
                <div className={`flex flex-col rounded-lg p-3 text-sm ${
                  msg.userId === "1"
                    ? 'bg-blue-50 border border-blue-200 text-blue-800'
                    : msg?.userId === userId 
                      ? 'bg-pink-50 border border-pink-200 text-pink-800' 
                      : 'bg-gray-50 border border-gray-200 text-gray-800'
                }`}>
                  {msg.username && <span className="font-medium opacity-80">{msg.username}</span>}
                  <span>{msg.message}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef}></div>
        </div>
        
        <div className="p-4 border-t border-purple-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
              }}}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 rounded-lg bg-white border border-purple-200 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
            />
            <button
              onClick={handleSendMessage}
              disabled={!chatMessage.trim()}
              className={`p-2 rounded-lg transition-colors hover:cursor-pointer ${
                !chatMessage.trim() 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-pink-500 hover:bg-pink-600 text-white'
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Show Results */}
      <ShowResults
        showResults={showResults}
        topParticipants={topParticipants}
      />

      <LoadingOverlay show={isLoading} />
    </div>
  );
};

export default DrawingGameInterface;