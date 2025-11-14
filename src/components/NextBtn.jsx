function NextBtn({ dispatch, answer, index, num }) {
  if (answer == null) return null;

  if (index < num - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuest" })}
      >
        Next
      </button>
    );
  if (index === num - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "final" })}
      >
        Finish
      </button>
    );
}

export default NextBtn;
