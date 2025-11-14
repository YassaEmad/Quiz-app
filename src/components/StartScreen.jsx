function StartScreen({ num, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the quiz 💀</h2>
      <h3>{num} question to test </h3>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        lets start
      </button>
    </div>
  );
}

export default StartScreen;
