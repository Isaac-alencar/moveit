import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';

import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number,
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel :number
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelupModal: () => void;
}

interface ChalleChallengesProveiderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  completedChallenges: number;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProveider({
  children, ...rest
}: ChalleChallengesProveiderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setchallengesCompleted] = useState(rest.completedChallenges ?? 0 );

  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('ChallengeCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function closeLevelupModal () {
    setIsLevelModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallgengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallgengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('New challenge 🎉', {
        body: `Get ${challenge.amount} xp!`
      })
    }
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
    setchallengesCompleted(challengesCompleted + 1)

  }

  // Calc based on RPG next level up
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted,
        experienceToNextLevel,
        activeChallenge,
        completeChallenge,
        resetChallenge,
        levelUp,
        closeLevelupModal,
        startNewChallenge,
      }}
    >
      {children}
      { isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
