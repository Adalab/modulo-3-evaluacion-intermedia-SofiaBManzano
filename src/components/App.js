import "../styles/App.scss";
import { useEffect, useState } from "react";
//import adalabersList from "../services/apijson.json";
import callToApi from "../services/api";
function App() {
  //estados
  const [adalabers, setAdalabers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputSpeciality, setInputSpeciality] = useState("");
  const [inputCounselor, setInputCounselor] = useState("");
  //constantes normales
  const title = "Adalabers";
  const getHtml = () => {
    return adalabers.map((eachAdalaber) => (
      <tr key={eachAdalaber.id}>
        <td>{eachAdalaber.name}</td>
        <td>{eachAdalaber.counselor}</td>
        <td>{eachAdalaber.speciality}</td>
      </tr>
    ));
  };
  useEffect(
    () => {
      callToApi().then((responseData) => {
        setAdalabers(responseData);
      });
    },
    //segundo parámetro: cuándo se ejecuta useEffect

    []
  );
  //funciones manejadoras
  const handleInputName = (ev) => {
    setInputName(ev.currentTarget.value);
  };
  const handleInputCounselor = (ev) => {
    setInputCounselor(ev.currentTarget.value);
  };
  const handleInputSpeciality = (ev) => {
    setInputSpeciality(ev.currentTarget.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    const newAdalaber = {
      name: inputName,
      counselor: inputCounselor,
      speciality: inputSpeciality,
    };
    //me creo una nueva variable con el spread (plagia contactos antiguos y suma los nuevos)

    let newAdalaberList = [...adalabers, newAdalaber];

    //cambio el valor del estado adalabers
    setAdalabers(newAdalaberList);
    //limpio inputs
    setInputSpeciality("");
    setInputCounselor("");
    setInputSpeciality("");
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
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre..."
          value={inputName}
          onChange={handleInputName}
        />
        <label htmlFor="name">Tutora:</label>
        <input
          type="text"
          name="counselor"
          placeholder="Tutora..."
          value={inputCounselor}
          onChange={handleInputCounselor}
        />
        <label htmlFor="name">Especialidad</label>
        <input
          type="text"
          name="speciality"
          placeholder="Especialidad..."
          value={inputSpeciality}
          onChange={handleInputSpeciality}
        />
        <input
          className="new-contact__btn"
          type="submit"
          value="Añadir"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default App;
