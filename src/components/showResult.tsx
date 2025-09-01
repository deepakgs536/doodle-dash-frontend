import React from 'react';
import { Trophy, Medal, Award, Star, Crown } from 'lucide-react';

// TypeScript interfaces
interface Participant {
  id: string;
  username: string;
  score: number;
  color: string;
}

interface ShowResultsProps {
  showResults: boolean;
  topParticipants: Participant[];
}

const ShowResults: React.FC<ShowResultsProps> = ({ 
  showResults, 
  topParticipants
}) => {
  const getTrophyIcon = (position: number): JSX.Element => {
    switch (position) {
      case 0: return <Crown className="w-8 h-8 text-yellow-500" />;
      case 1: return <Trophy className="w-7 h-7 text-gray-400" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const getPositionStyles = (position: number): string => {
    switch (position) {
      case 0: return "scale-110 z-30 -mt-4";
      case 1: return "scale-100 z-20";
      case 2: return "scale-95 z-10 mt-2";
      default: return "scale-90";
    }
  };

  const getPositionLabel = (position: number): string => {
    switch (position) {
      case 0: return "1st";
      case 1: return "2nd";
      case 2: return "3rd";
      default: return `${position + 1}th`;
    }
  };

  if (!showResults) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-4xl w-full border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Top Champions
            </h1>
            <Trophy className="w-12 h-12 text-yellow-400 ml-3" />
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Podium */}
        <div className="flex justify-center items-end space-x-8 mb-8">
          {topParticipants.map((participant, index) => (
            <div
              key={participant.id}
              className={`${getPositionStyles(index)} transform transition-all duration-700 translate-y-0 opacity-100`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Trophy/Medal */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  {getTrophyIcon(index)}
                  {index === 0 && (
                    <div className="absolute -inset-2 bg-yellow-400/20 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>

              {/* Card */}
              <div className={`bg-gradient-to-br ${participant.color} p-6 rounded-2xl shadow-2xl border-4 ${
                index === 0 ? 'border-yellow-400/50' : 'border-white/30'
              } min-w-[250px] relative overflow-hidden`}>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] animate-shine"></div>
                
                {/* Avatar */}
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                    index === 0 ? 'bg-yellow-400/20 text-yellow-100' : 'bg-white/20 text-white'
                  }`}>
                    <Star className="w-4 h-4 mr-1" />
                    {getPositionLabel(index)}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-white font-bold text-xl text-center mb-2">
                  {participant?.username}
                </h3>

                {/* Score */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {participant.score.toLocaleString()}
                  </div>
                </div>

                {/* Winner badge */}
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    WINNER
                  </div>
                )}
              </div>

              {/* Podium base */}
              <div className={`mt-4 bg-gradient-to-t ${participant.color} rounded-t-lg ${
                index === 0 ? 'h-24' : index === 1 ? 'h-16' : 'h-12'
              } flex items-center justify-center shadow-lg`}>
                <div className="text-white font-bold text-lg">
                  #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowResults;