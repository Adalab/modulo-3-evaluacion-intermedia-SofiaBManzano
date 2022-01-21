import "../styles/App.scss";
import { useEffect, useState } from "react";

import callToApi from "../services/api";
function App() {
  //estados
  const [adalabers, setAdalabers] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputSpeciality, setInputSpeciality] = useState("");
  const [inputCounselor, setInputCounselor] = useState("");
  const [inputFilterName, setInputFilterName] = useState("");
  const [filterSelect, setFilterSelect] = useState("Selecciona una tutora");
  //constantes normales
  const title = "Adalabers";

  const getHtml = () => {
    if (filterSelect === "Selecciona una tutora") {
      return adalabers
        .filter((eachAdalaber) =>
          eachAdalaber.name
            .toLowerCase()
            .includes(inputFilterName.toLowerCase())
        )
        .map((eachAdalaber) => (
          <tr className="list__adalabers" key={eachAdalaber.id}>
            <td>{eachAdalaber.name}</td>
            <td>{eachAdalaber.counselor}</td>
            <td>{eachAdalaber.speciality}</td>
            <td>
              {eachAdalaber.social_networks.map((eachSocial) => (
                <td>
                  <a href={eachSocial.url}>{eachSocial.name}</a>
                </td>
              ))}
            </td>
          </tr>
        ));
    } else {
      return adalabers
        .filter((eachAdalaber) =>
          eachAdalaber.name
            .toLowerCase()
            .includes(inputFilterName.toLowerCase())
        )
        .filter((eachAdalaber) => eachAdalaber.counselor.includes(filterSelect))
        .map((eachAdalaber) => (
          <tr className="list__adalabers" key={eachAdalaber.id}>
            <td>{eachAdalaber.name}</td>
            <td>{eachAdalaber.counselor}</td>
            <td>{eachAdalaber.speciality}</td>
            <td>
              {eachAdalaber.social_networks.map((eachSocial) => (
                <td>
                  <a href={eachSocial.url}>{eachSocial.name}</a>
                </td>
              ))}
            </td>
          </tr>
        ));
    }
  };
  useEffect(() => {
    callToApi().then((responseData) => {
      setAdalabers(responseData);
    });
  }, []);
  //funciones manejadoras
  const handleFilterSelect = (ev) => {
    setFilterSelect(ev.target.value);
  };
  const handleInputName = (ev) => {
    setInputName(ev.currentTarget.value);
  };
  const handleInputCounselor = (ev) => {
    setInputCounselor(ev.currentTarget.value);
  };
  const handleInputSpeciality = (ev) => {
    setInputSpeciality(ev.currentTarget.value);
  };
  const handleFilterName = (ev) => {
    setInputFilterName(ev.currentTarget.value);
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

      <form>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          placeholder="Ej. MariCarmen"
          value={inputFilterName}
          onChange={handleFilterName}
        ></input>
        <label htmlFor="name">Tutora:</label>
        <select
          name="select"
          value={filterSelect}
          onChange={handleFilterSelect}
        >
          <option>Selecciona una tutora</option>
          <option>Yanelis</option>
          <option>Iván</option>
          <option>Dayana</option>
        </select>
      </form>
      <table className="list__adalab">
        {/* Fila de cabecera  */}
        <thead>
          <tr className="title__list">
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
            <th>Redes</th>
          </tr>
        </thead>
        <tbody>{getHtml()}</tbody>
      </table>
      <h2 className="newAdalaber">Añadir una Adalaber</h2>
      <form className="form">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          placeholder="Ej. Maricarmen"
          value={inputName}
          onChange={handleInputName}
        />
        <label htmlFor="name">Tutora:</label>
        <input
          type="text"
          name="counselor"
          placeholder="Ej. Yanelis"
          value={inputCounselor}
          onChange={handleInputCounselor}
        />
        <label htmlFor="name">Especialidad</label>
        <input
          type="text"
          name="speciality"
          placeholder="Ej. ReactJS"
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
