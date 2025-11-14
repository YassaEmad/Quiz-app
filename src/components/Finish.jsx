function Finish({ points, max, highScore, dispatch }) {
  const prec = (points / max) * 100;
  let emo;

  if (prec === 100) emo = "🥇";
  if (prec >= 80 && prec < 100) emo = "🎉";
  if (prec >= 50 && prec < 80) emo = "😊";
  if (prec >= 0 && prec < 50) emo = "🤔";
  if (prec === 0) emo = "😔";
  return (
    <>
      <p className="result">
        <span>{emo}</span>
        You Scored <strong>{points}</strong> out of {max} ( {Math.ceil(prec)}%)
      </p>
      <p className="highscore">(Highscore : {highScore})</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Finish;
