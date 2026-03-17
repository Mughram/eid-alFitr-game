#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;
let rightAnswers = 0;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.karaoke(
    "Welcome to the EID al-Fitr quiz Game\n",
  );

  await sleep(2500);
  rainbowTitle.stop();
  console.log(`
        ${chalk.bgBlue("How TO PLAY")}
        ${chalk.blue("______________________________________")}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed("killed")} and you will go back to the beginning.
        So get all the question right...
        
        `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
  });
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "select",
    message: "In which year was the first EID al-Fitr celebrated? \n",
    choices: [
      "The Second Year of the Hijrah(migration)",
      "The First Year of the Hijrah(migration)",
      "The Fourth Year of the Hijrah(migration)",
      "The Third Year of the Hijrah(migration)",
    ],
  });
  return handleAnswer(
    answers.question_1 === "The Second Year of the Hijrah(migration)",
    rightAnswers++,
  );
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "select",
    message: "Why it was named EID al-Fitr?",
    choices: [
      "Because it marks the end of Ramadan",
      "Because it is a day of celebration",
      "Because Muslims break their fast after fasting during the month of Ramadan",
      "Because it is a day of forgiveness",
    ],
  });
  return handleAnswer(
    answers.question_2 ===
      "Because Muslims break their fast after fasting during the month of Ramadan",
    rightAnswers++,
  );
}
async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "select",
    message: "What is a common tradition on Eid al-Fitr?",
    choices: [
      "Fasting all day",
      "Giving gifts and visiting family",
      "Staying silent",
      "Working all day",
    ],
  });

  return handleAnswer(
    answers.question_3 === "Giving gifts and visiting family",
    rightAnswers++,
  );
}
async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "select",
    message: "What is eaten before going to Eid prayer?",
    choices: ["Nothing (fasting continues)", "Rice", "Bread only", "Dates"],
  });

  return handleAnswer(answers.question_4 === "Dates", rightAnswers++);
}
async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "select",
    message: "What is forbidden on Eid al-Fitr?",
    choices: ["Eating food", "Fasting", "Praying", "Giving charity"],
  });

  return handleAnswer(answers.question_5 === "Fasting", rightAnswers++);
}
async function question6() {
  const answers = await inquirer.prompt({
    name: "question_6",
    type: "select",
    message: "What is the main purpose of Eid al-Fitr?",
    choices: [
      "To start fasting",
      "To celebrate the end of Ramadan",
      "To travel",
      "To work harder",
    ],
  });

  return handleAnswer(
    answers.question_6 === "To celebrate the end of Ramadan",
    rightAnswers++,
  );
}
async function question7() {
  const answers = await inquirer.prompt({
    name: "question_7",
    type: "select",
    message: "How long does Eid al-Fitr last?",
    choices: ["1 day", "2 days", "3 days", "1 week"],
  });

  return handleAnswer(answers.question_7 === "1 day", rightAnswers++);
}
async function question8() {
  const answers = await inquirer.prompt({
    name: "question_8",
    type: "select",
    message: "What is commonly given before Eid prayer?",
    choices: ["Zakat al-Fitr", "Hajj money", "Sadaqah Jariyah", "Gold"],
  });

  return handleAnswer(answers.question_8 === "Zakat al-Fitr", rightAnswers++);
}
async function question9() {
  const answers = await inquirer.prompt({
    name: "question_9",
    type: "select",
    message: "What emotion is strongly encouraged on Eid?",
    choices: ["Sadness", "Anger", "Joy and gratitude", "Fear"],
  });

  return handleAnswer(
    answers.question_9 === "Joy and gratitude",
    rightAnswers++,
  );
}
async function question10() {
  const answers = await inquirer.prompt({
    name: "question_10",
    type: "select",
    message: "How many rak'ahs are in the Eid prayer?",
    choices: ["2", "3", "4", "5"],
  });

  return handleAnswer(answers.question_10 === "2", rightAnswers++);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({
      text: `Correct! ${playerName} you answered ${rightAnswers} out of 10 questions correctly! \n`,
    });
  } else {
    spinner.error({
      text: `Incorrect! ${playerName} Game over! You will go back to the beginning
            !`,
    });
    rightAnswers = 0;
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congratulations, ${playerName}! You won!`;

  figlet(msg, (err, data) => {
    console.log(gradient.cristal.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
winner();
