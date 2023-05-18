import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../Header";
import BodyVuelos from "../BodyVuelos";
import Footer from "../Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
const Home = () => {
  const [vuelos, setVuelos] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    localStorage.getItem("vuelos") ? navigate("/vuelo") : console.log("");
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand" href="#">
            Navbar
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page" href="#">
                  Home
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link" href="#">
                  Link
                </span>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <span> ruta</span>
                  </li>
                  <li>
                    <span> abohter action</span>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <span> somethin else</span>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <span> ruta</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Header></Header>
      Home <br></br>
      <Link to="/vuelos">vuelos</Link>
      <BodyVuelos></BodyVuelos>
      <form
        className="d-flex flex-column col-12"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          const response = await axios.get(
            `http://localhost:3000/vuelos?origen=${data.origen}&destino=${data.destino}&salidaDate=${data.salidaDate}`
          );
          console.log(response.data);
          if (response.data.length) {
            setVuelos([...response.data]);
          } else {
            alert("no hay vuelos");
          }
        })}
      >
        <label> Origen Salida</label>
        <select {...register("origen", { required: true })}>
          <option value={"Medellin"}>medellin </option>
          <option value={"Cali"}>cali </option>
        </select>
        {errors.origen && <p>Please enter number for age.</p>}
        <label> Origen Destino</label>

        <select {...register("destino", { required: true })}>
          <option value={"Medellin"}>medellin </option>
          <option value={"Cali"}>cali </option>
        </select>
        {errors.destino && <p>Please enter number for age.</p>}
        <label> Cantidad de pasajeros</label>

        <select {...register("pasajeros", { required: true })}>
          <option value={1}>1 passenger </option>
          <option value={2}>2 passengers </option>
          <option value={3}>3 passengers </option>
        </select>
        {errors.pasajeros && <p>Please select valid info</p>}
        <label> Fecha de salida</label>

        <input
          type="date"
          placeholder="selelciona una fecha de salida"
          {...register("salidaDate", { required: true })}
        />
        {errors.salidaDate && <p>Please enter a date</p>}
        <input type="submit" className="btn btn-primary" />
      </form>
      vuelos aqui
      {vuelos && vuelos.length
        ? vuelos.map((item, key) => (
            <div className="d-flex flex-column border" key={key}>
              <span>Ciudad de origen{item.origen} </span>
              <span>Destino{item.destino} </span>
              <span>Fecha{item.salidaDate} </span>
              <span>Costo{item.costo} </span>
              <button
                className="btn btn-success col-4"
                onClick={() => {
                  localStorage.setItem("vuelos", JSON.stringify(item));
                  console.log(item);
                }}
              >
                {" "}
                Reservar este vuelo
              </button>
            </div>
          ))
        : ""}
      <Footer></Footer>
    </div>
  );
};

export default Home;
