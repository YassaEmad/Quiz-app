function Options({ question, dispatch, answer }) {
  const hans = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option  ${index == answer ? "answer" : ""} ${
              hans
                ? index == question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={hans}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
