import React from "react";

const DetalleComida = ({ comida, onClose }) => {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "10px",
        width: "700px", // Ancho ajustado
        margin: "auto", // Centra la tarjeta horizontalmente
        backgroundColor: "#f5f5f5", // Color de fondo opcional
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // Sombra para resaltar
      }}
    >
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>{comida.nombre}</h2>
        <p>
          <strong>Región:</strong> {comida.region}
        </p>
        <p>
          <strong>Ciudad:</strong> {comida.ciudad}
        </p>
        <p>
          <strong>Descripción: </strong>
          {comida.descripcion}
        </p>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img
          src={comida.imagen}
          alt={comida.nombre}
          className="custom-image"
          style={{
            borderRadius: "15px",
            maxWidth: "300px", // Ajusta el tamaño de la imagen
            maxHeight: "300px",
          }}
        />
      </div>
    </div>
  );
};

export default DetalleComida;
