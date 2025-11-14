function Progress({ index, num, points, max, answer }) {
  return (
    <header className="progress">
      <progress max={num} value={index + Number(answer !== null)}></progress>
      <p>
        Question{" "}
        <strong>
          {index + 1}/{num}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{max}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
