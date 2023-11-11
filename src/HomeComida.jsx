import { useState, useEffect, React } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Dropdown, Modal } from "react-bootstrap";
import "./HomeComida.css";
import DetalleComida from "./DetalleComida";
import logo from "./assets/img/logo2.png";

export const HomeComida = () => {
  const [listaEmp, setListaEmp] = useState([]);
  const [regionesUnicas, setRegionesUnicas] = useState([]);
  const [search, setSearch] = useState("");
  const [showDetalle, setShowDetalle] = useState(false);
  const [detalleComida, setDetalleComida] = useState(null);
  const [banderasUnicas, setBanderasUnicas] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);

  const getMostrar = () => {
    axios.get("http://localhost:3001/mostrar").then((response) => {
      setListaEmp(response.data);
    });
  };

  const abrirDetalle = (comida) => {
    setDetalleComida(comida);
    setShowDetalle(true);
  };

  const cerrarDetalle = () => {
    setDetalleComida(null);
    setShowDetalle(false);
  };

  useEffect(() => {
    if (listaEmp.length > 0) {
      // Obtener regiones únicas usando un Set
      const uniqueRegions = [...new Set(listaEmp.map((val) => val.region))];
      setRegionesUnicas(uniqueRegions);
    }
  }, [listaEmp]);

  useEffect(() => {
    if (listaEmp.length > 0) {
      const banderasPorRegion = {};
      listaEmp.forEach((val) => {
        if (!banderasPorRegion[val.region]) {
          banderasPorRegion[val.region] = val.bandera;
        }
      });

      const banderasUnicas = Object.values(banderasPorRegion);

      setBanderasUnicas(banderasUnicas); // Actualiza el estado de las banderas únicas
    }
  }, [listaEmp]);

  const seleccionarPais = (bandera) => {
    const pais = listaEmp.find((item) => item.bandera === bandera)?.region;
    setPaisSeleccionado(pais);
  };

  //buscador
  const buscador = (e) => {
    setSearch(e.target.value);
  };

  const resultado = !search
    ? paisSeleccionado
      ? listaEmp.filter((dato) => dato.region === paisSeleccionado)
      : listaEmp
    : listaEmp.filter(
        (dato) =>
          (paisSeleccionado ? dato.region === paisSeleccionado : true) &&
          (dato.ciudad.toLowerCase().includes(search.toLowerCase()) ||
            dato.region.toLowerCase().includes(search.toLowerCase()) ||
            dato.nombre.toLowerCase().includes(search.toLowerCase()))
      );

  useEffect(() => {
    getMostrar();
  }, []);

  return (
    <>
      {/* <Router> */}
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href={{}}>
            <img
              src={logo}
              alt="logo"
              width="125"
              height="40"
              className="d-inline-block align-text-top"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <Dropdown as="li" className="nav-item">
                <Dropdown.Toggle
                  as="a"
                  className="nav-link"
                  id="dropdown-basic"
                >
                  Países
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {regionesUnicas.map((region, key) => {
                    const banderaUnica = listaEmp.find(
                      (val) => val.region === region
                    )?.bandera;

                    return (
                      <Dropdown.Item
                        key={key}
                        className="region-item"
                        onClick={() => seleccionarPais(banderaUnica)}
                      >
                        {banderaUnica && (
                          <img
                            src={banderaUnica}
                            alt="bandera"
                            className="bandera"
                          />
                        )}
                        <span className="region-name">{region}</span>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </div>
      </nav>
      <div className="" style={{ backgroundColor: "#f2f6fc" }}>
        <header className="masthead" style={{ marginBottom: "20px" }}>
          <div className="container position-relative">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="text-center text-white">
                  <h1 className="mb-5 ">
                    ¡Conoce los platillos mas famosos del mundo!
                  </h1>
                  <div className="row">
                    <div className="col">
                      <input
                        value={search}
                        onChange={buscador}
                        className="form-control form-control-lg"
                        id="textInput"
                        type="text"
                        placeholder="Busca la comida mas famosa de la región"
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-primary btn-lg"
                        id="submitButton"
                        type="Button"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          className="container"
          style={{ color: "#363d47", marginTop: "80px" }}
        >
          <h2>
            <strong>¡¡Mejores comidas del mundo!!</strong>
          </h2>
          <div
            className="row"
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            {resultado.map((val, key) => {
              return (
                <div
                  className="col-md-3"
                  key={key}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <Card
                    className="card-hover-animation"
                    style={{
                      backgroundColor: "#E7EFFA",
                      color: "#363d47",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>
                        <strong>{val.nombre}</strong>
                      </Card.Title>
                      <Card.Img
                        variant="top"
                        src={val.imagen}
                        style={{
                          width: "100%",
                          aspectRatio: 1,
                          borderRadius: "10px",
                        }}
                      />
                      <Card.Text>
                        Región: <strong>{val.region}</strong>
                        <br />
                        Ciudad: <strong>{val.ciudad}</strong>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => abrirDetalle(val)}
                      >
                        Más información
                      </Button>
                      {/*  </Link> */}
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal
        show={showDetalle}
        onHide={cerrarDetalle}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Información sobre la comida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detalleComida && <DetalleComida comida={detalleComida} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={cerrarDetalle}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <footer
        style={{
          backgroundColor: "#E7EFFA",
          color: "#363d47",
          padding: "0 0 20px 0",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <p>&copy; 2023 QuickCode. Todos los derechos reservados.</p>
            </div>
            <div className="col-lg-6">
              {/* Aquí puedes agregar contenido para el lado derecho si lo deseas */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
