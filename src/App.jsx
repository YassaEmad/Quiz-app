import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextBtn from "./components/NextBtn";
import Progress from "./components/Progress";
import Finish from "./components/Finish";

const inital = {
  questions: [],
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  api: "",
};
function reducer(state, action) {
  const quest = state.questions.at(state.index);
  switch (action.type) {
    case "daRe":
      return { ...state, questions: action.payload, status: "active" };
    case "daFa":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "loading" };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === quest.correctOption
            ? state.points + quest.points
            : state.points,
      };
    case "nextQuest":
      return { ...state, index: state.index + 1, answer: null };
    case "final":
      return {
        ...state,
        status: "finish",
        highScore: Math.max(state.points, state.highScore),
      };
    case "reset":
      return {
        ...state,
        answer: null,
        status: "ready",
        index: 0,
        points: 0,
        highScore: 0,
        api: null,
      };
    case "changeApi":
      return { ...state, api: action.payload };

    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, api },
    dispatch,
  ] = useReducer(reducer, inital);

  useEffect(
    function () {
      if (status !== "loading" || !api) return;
      fetch(
        `https://raw.githubusercontent.com/YassaEmad/Quiz-app/main/api/${api}.json`
      )
        .then((res) => res.json())
        .then((data) => dispatch({ type: "daRe", payload: data.questions }))
        .catch((error) => dispatch({ type: "daFa", payload: error }));
    },
    [api, status]
  );
  const num = questions.length;
  const max = questions.reduce((prev, cur) => prev + cur.points, 0);
  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScreen dispatch={dispatch} />}

          {status === "active" && (
            <>
              <Progress
                index={index}
                num={num}
                points={points}
                max={max}
                answer={answer}
              />
              <Question
                question={questions[index]}
                answer={answer}
                dispatch={dispatch}
              />
              <NextBtn
                dispatch={dispatch}
                answer={answer}
                index={index}
                num={num}
              />
            </>
          )}
          {status === "finish" && (
            <Finish
              points={points}
              max={max}
              highScore={highScore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
