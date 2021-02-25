import { createContext, ReactNode, useState } from "react";

import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number,
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  ChallengesCompleted: number;
  experienceToNextLevel :number
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChalleChallengesProveiderProps {
  children: ReactNode;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProveider({
  children,
}: ChalleChallengesProveiderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [ChallengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallgengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallgengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge () {
    setActiveChallenge(null);
  }

  function completeChallenge () {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount; 

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(ChallengesCompleted + 1)

  }

  // Calc based on RPG next level up
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        ChallengesCompleted,
        experienceToNextLevel,
        activeChallenge,
        completeChallenge,
        resetChallenge,
        levelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
