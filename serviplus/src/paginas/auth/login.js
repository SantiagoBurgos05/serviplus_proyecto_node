import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Login = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    document.getElementById("email").focus();
  }, []);

  const iniciarSesion = async () => {
    /*if (password.length < 6) {
      const msg = "La contraseña debe tener al menos 6 caracteres";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true
          }
        }
      });
    }	*/
    try {
      const response = await APIInvoke.invokeGET(`/Usuarios?email=${usuario.email}`);

      if (response.length === 0) {
        const msg = "El usuario no existe. Verifique los datos ingresados.";
        swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'Ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      } else {
        const storedPassword = response[0].password;
        if (password === storedPassword) {
          const jwt = response.token;
          localStorage.setItem("token", jwt);
          navigate("/Home");
        } else {
          
          const msg = "Contraseña incorrecta. Verifique los datos ingresados.";
          swal({
            title: 'Error',
            text: msg,
            icon: 'error',
            buttons: {
              confirm: {
                text: 'Ok',
                value: true,
                visible: true,
                className: 'btn btn-danger',
                closeModal: true
              }
            }
          });
        }
      }
    } catch (error) {
      console.error("Error al verificar el usuario:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  }

  return (
    <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <Link to={"#"}>
              <b>Inicio</b> Sesión
            </Link>
          </div>
        <div className="card">
          <div className="card-body login-card-body">
          <p className="login-box-msg">Bienvenido, ingrese sus credenciales de acceso</p>
          <form onSubmit={onSubmit}/*action="../../index3.html" method="post"*/>
            <div className="input-group mb-3">
              <input type="email" 
              className="form-control" 
              placeholder="Email" 
              id="email" 
              name="email"
              value={email}
              onChange={onChange}
              required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input type="password" 
              className="form-control" 
              placeholder="Password" 
              id="password" 
              name="password"
              value={password}
              onChange={onChange}
              required/>
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="social-auth-links text-center mb-3">
              <button type="submit" className="btn btn-block btn-primary">
                <i /> Ingresar
              </button>
              <Link to={"/CrearCuenta"} className="btn btn-block btn-danger">
                <i /> Crear Cuenta
              </Link>
              <Link to={"/CrearTikets"} className="btn btn-block btn-success ">
                <i/>Crear Tiket
              </Link>
            </div>
          </form>
          </div>
          </div>  
        </div>
    </div>
  );
};

export default Login;
