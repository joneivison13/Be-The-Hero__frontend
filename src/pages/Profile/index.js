import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import "./styles.css";
import api from "../../services/api";

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Error to delete, try again!')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/');
    }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span> Welcome, {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>

        <button onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
      {incidents.slice(0).reverse().map(incident => ( //I used the slice and reverse to show the most new incident on the top
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('en-ca', { style: 'currency', currency: 'CAD' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
      </ul>

      {/* <ul>
            <li>
                <strong>CASO:</strong>
                <p>caso teste</p>

                <strong>DESCRIÇÃO</strong>
                <p>Descrição teste</p>

                <strong>VALOR</strong>
                <p>R$200,00</p>

                <button><FiTrash2 size={20} color="#a8a8ab3"/> </button>
            </li>
            <li>
                <strong>CASO:</strong>
                <p>caso teste</p>

                <strong>DESCRIÇÃO</strong>
                <p>Descrição teste</p>

                <strong>VALOR</strong>
                <p>R$200,00</p>

                <button><FiTrash2 size={20} color="#a8a8ab3"/> </button>
            </li>
            <li>
                <strong>CASO:</strong>
                <p>caso teste</p>

                <strong>DESCRIÇÃO</strong>
                <p>Descrição teste</p>

                <strong>VALOR</strong>
                <p>R$200,00</p>

                <button><FiTrash2 size={20} color="#a8a8ab3"/> </button>
            </li>
            <li>
                <strong>CASO:</strong>
                <p>caso teste</p>

                <strong>DESCRIÇÃO</strong>
                <p>Descrição teste</p>

                <strong>VALOR</strong>
                <p>R$200,00</p>

                <button><FiTrash2 size={20} color="#a8a8ab3"/> </button>
            </li>
            <li>
                <strong>CASO:</strong>
                <p>caso teste</p>

                <strong>DESCRIÇÃO</strong>
                <p>Descrição teste</p>

                <strong>VALOR</strong>
                <p>R$200,00</p>

                <button><FiTrash2 size={20} color="#a8a8ab3"/> </button>
            </li>
        </ul> */}
    </div>
  );
}
