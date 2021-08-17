import "./style.css";
import { useHistory } from "react-router-dom";

function HomePage() {
  const history = useHistory();

  function handleClick() {
    history.push({ pathname: "/playway" });
  }

  return (
    <div className="HomePage">
      <h2 className="question">Welcome to Play Ways!</h2>
      <br />
      <h3 className="question">
        {" "}
        Se você é estudante de Engenharia de Software da FGA, aqui você consegue
        descobrir facilmente quais as matérias prioritárias para se matricular,
        levando em consideração as disciplinas que você já cursou e os
        pré-requisitos de todas. Basta selecionar as disciplinas que já cursou,
        e assim lhe será mostrado listas das matérias com prioridade 1, 2, 3...
      </h3>
      <br />
      <br />

      <button className="generateButton" onClick={handleClick}>
        {" "}
        Começar
      </button>
    </div>
  );
}

export default HomePage;
