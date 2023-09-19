import React, { useState, useEffect } from "react";
import Footer from "../../componentes/Footer";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import APIInvoke from "../../utils/APIInvoke";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const InfoRespuestas = () => {
  const { id } = useParams();
  const [tikets, setTikets] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const cargarTicket = async () => {
      try {
        const response = await APIInvoke.invokeGET(`/Tikets/${id}`);

        if (response && typeof response === "object") {
          setTikets(response);
        } else {
          console.error(
            "La respuesta de la API no contiene detalles válidos para el ticket."
          );
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los detalles del ticket:", error);
      }
    };

    cargarTicket();
  }, [id]);
  useEffect(() => {
  const cargarRespuesta = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/respuesta/${id}`);

      if (response && typeof response === "object") {
        setRespuesta(response);
      } else {
        console.error(
          "La respuesta de la API no contiene detalles válidos para el ticket."
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los detalles del ticket:", error);
    }
  };

  cargarRespuesta();
}, [id]);

  return (
    <div className="wrapper">
      <Navbar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Ver la respuesta"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Respuesta"}
          ruta2={"/Home"}
        />
        <section className="content">
          <div className="card-header bg-primary">
            <h1 className="card-title">Informacion del Ticket</h1>
          </div>
            <table>
              <thead>
              <tbody>
              {loading ? (
                  <p>Cargando detalles del ticket...</p>
                  ) : (
                  <tr key={tikets.id}>
                  <tr>
                  <p><strong>Email del usuario: </strong>{tikets.email}</p>
                  </tr>
                  <tr>
                  <p><strong>ID Ticket: </strong>{tikets.id}</p>
                  </tr>
                  <tr>
                  <p><strong>Fecha Creacion Ticket: </strong>{tikets.fecha}</p>
                  </tr>
                  <tr>
                  <p><strong>Contenido Ticket: </strong>{tikets.contenido}</p>
                  </tr>
                  </tr>
                )}
              </tbody>
              </thead>
            </table>
            <div className="card-header bg-success">
            <h1 className="card-title">Informacion de la Respuesta</h1>
            </div>
            <table>
            <thead>
              <tbody>
              {loading ? (
                  <p>Cargando detalles del ticket...</p>
                  ) : (
                  <tr key={respuesta.id}>
                  <tr>
                  <p><strong>ID Respuesta: </strong>{respuesta.id}</p>
                  </tr>
                  <tr>
                  <p><strong>Fecha Respuesta: </strong>{respuesta.fecha}</p>
                  </tr>
                  <tr>
                  <p><strong>Contenido Respuesta: </strong>{respuesta.respuesta}</p>
                  </tr>
                  </tr>
                )}
              </tbody>
              </thead>&nbsp;
              <tr></tr>
              <Link to={`/Respuestas`} className="btn btn-danger ml-3">
                Volver
              </Link>
            </table>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default InfoRespuestas;
