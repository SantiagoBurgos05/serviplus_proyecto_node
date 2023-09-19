import React, { useState, useEffect } from "react";
import Navbar from "../../componentes/Navbar";
import SidebarContainer from "../../componentes/SidebarContainer";
import ContentHeader from "../../componentes/ContentHeader";
import Footer from "../../componentes/Footer";
import APIInvoke from "../../utils/APIInvoke";
import { Link } from "react-router-dom";

const Respuestas = () => {


  const [respuesta, setRespuesta] = useState([]);

  useEffect(()=>{
    cargarRespuesta()
  },[])

  const cargarRespuesta = async()=>{
    const response = await APIInvoke.invokeGET("/respuesta")
    setRespuesta(response)
  }
  useEffect(()=>{
    cargarRespuesta()
  },[])

    return ( 
        <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div class="content-wrapper">
        <ContentHeader
          titulo={"Listado de Tikets"}
          breadCrumb1={"Inicio"}
          breadCrumb2={"Respuestas"}
          ruta2={"/Home"}
        />

        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Ver Tickets</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="collapse"
                  title="Collapse"
                >
                  <i className="fas fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  title="Remove"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Id</th>
                    <th style={{ width: "25%" }}>Contenido de la respuesta</th>
                    <th style={{ width: "20%" }}>Fecha de respuesta</th>
                    <th style={{ width: "25%" }}>Ver</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    respuesta.map(
                        item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>CONTENIDO DE RESPUESTA</td>
                            <td>{item.fecha}</td>
                            <td><Link to={`/InfoRespuesta/${item.id}`} className="btn btn-sm btn-primary">Ver respuesta</Link>
                            </td>
                        </tr>
                    )
                  }

                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
     );
}
 
export default Respuestas;