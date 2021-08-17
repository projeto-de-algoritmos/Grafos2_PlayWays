import "./style.css";

function Priorities(history) {
  let subjectPriorities = history.location.state.subjectPriorities;
  console.log(history);
  let sortedPriorites = sortPriorites(subjectPriorities);

  console.log(subjectPriorities);
  console.log(sortedPriorites);

  return (
    <>
      <div className="inform">
        <h2> Prioridades</h2>

        <h3>
          O número da coluna informa a maior sequência de disciplinas que a
          disciplina da coluna tranca
        </h3>
      </div>

      {/* {sortedPriorites.map(() => ())} */}
      <div className="result">
        {sortedPriorites.map((sortedPriority, idx) => {
          if (sortedPriority.length > 0) {
            return (
              <div className="prioritygroup">
                <div className="priorityLabel"> {6 - idx}</div>

                {sortedPriority.map((priority, idx) => (
                  <div className="subject" key={idx}>
                    <div className="subjectName">{priority.subject.value} </div>
                    <h3>Tranca diretamente:</h3>

                    {priority.subject.adjacents.map((locked, idx) => (
                      <h4>- {locked}</h4>
                    ))}
                  </div>
                ))}
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default Priorities;

//elems with priority 7 comes first
function sortPriorites(subjectPriorities) {
  let arraytop = [[], [], [], [], [], [], []];

  for (const subject in subjectPriorities) {
    arraytop[7 - subjectPriorities[subject].priority].push(
      subjectPriorities[subject]
    );
  }

  return arraytop;
}
