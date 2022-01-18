import "../styles/App.scss";
import { useState } from "react";
import adalabersList from "../services/apijson.json";
//import callToApi from '../services/api';
function App() {
  //estados
  const [adalabers, setAdalabers] = useState(adalabersList);

  //constantes normales
  const title = "Adalabers";
  const getHtml = () => {
    return adalabersList.results.map((eachAdalaber) => (
      <tr>
        <td>{eachAdalaber.name}</td>
        <td>{eachAdalaber.counselor}</td>
        <td>{eachAdalaber.speciality}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1>{title}</h1>

      <table>
        {/* Fila de cabecera  */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>{getHtml()}</tbody>
      </table>
      <h2>Añadir una Adalaber</h2>
      <form>
        <label for="name">Nombre:</label>
        <input type="text" name="name" placeholder="Nombre..." />
        <label for="name">Tutora:</label>
        <input type="text" name="counselor" placeholder="Tutora..." />
        <label for="name">Especialidad</label>
        <input type="text" name="speciality" placeholder="Especialidad..." />
        <input className="new-contact__btn" type="submit" value="Añadir" />
      </form>
    </div>
  );
}

export default App;
