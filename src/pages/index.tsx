import React from "react";
import Head from "next/head";

import { GetServerSideProps } from "next";

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { ChallengeBox } from "../components/ChallengeBox";

import { ChallengesProveider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProveider
      level={props.level}
      currentExperience={props.currentExperience}
      completedChallenges={props.completedChallenges}
    >
      <div className={styles.container}>
      <Head>
        <title>Home | move.it</title>
      </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProveider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, completedChallenges } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallenges: Number(completedChallenges),
    },
  };
};
