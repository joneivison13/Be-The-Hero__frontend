import React, { useState } from "react";
import "./styles.css";
import HeroesImg from "../../assets/heroes.png";
import LogoImg from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const res = await api.post("sessions", {id} );

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", res.data.name);
      history.push("profile");

    } catch (error) {
      alert("Falha no Login :(  Tente Novamente Mais Tarde");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={LogoImg} alt="Be The Hero" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>

          <input
            type="text"
            placeholder="Faça seu Logon"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={HeroesImg} alt="hearoes" />
    </div>
  );
}
