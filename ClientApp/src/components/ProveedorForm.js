import React, { useState } from 'react';

const ProveedorForm = ({ onSubmit, cerrarFormulario }) => {
  const [proveedor, setProveedor] = useState({
    id: '3',
    razonSocial: 'test',
    nombreComercial: 'test',
    identificacionTributaria: 'test',
    numeroTelefonico: '123545',
    correoElectronico: 'a@a.com',
    sitioWeb: 'test.com',
    direccionFisica: 'Av Test',
    pais: 'Peru',
    facturacionAnual: '10',
    fechaUltimaEdicion: '2024-01-03T10:34:53.44',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor((prevProveedor) => ({ ...prevProveedor, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5001/api/proveedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proveedor),
      });

      if (response.ok) {
        console.log('Proveedor insertado exitosamente');
        onSubmit(); // Llamada a la función del padre para recargar la lista de proveedores
      } else {
        console.error('Error al insertar proveedor:', response);
        // Manejo de errores
      }
    } catch (error) {
      console.error('Error al insertar proveedor:', error);
      // Manejo de errores
    } finally {
      cerrarFormulario(); // Cerrar el formulario independientemente del resultado de la inserción
    }
  }
    


  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Información del Proveedor</legend>

        <label>Razón Social:</label>
        <input type="text" name="razonSocial" value={proveedor.razonSocial} onChange={handleChange} required />

        <label>Nombre Comercial:</label>
        <input type="text" name="nombreComercial" value={proveedor.nombreComercial} onChange={handleChange} required />

        <label>Identificación Tributaria:</label>
        <input type="text" name="identificacionTributaria" value={proveedor.identificacionTributaria} onChange={handleChange} />

        <label>Número Telefónico:</label>
        <input type="tel" name="numeroTelefonico" value={proveedor.numeroTelefonico} onChange={handleChange} />

        <label>Correo Electrónico:</label>
        <input type="email" name="correoElectronico" value={proveedor.correoElectronico} onChange={handleChange} />

        <label>Sitio Web:</label>
        <input type="text" name="sitioWeb" value={proveedor.sitioWeb} onChange={handleChange} />

        <label>Dirección Física:</label>
        <input type="text" name="direccionFisica" value={proveedor.direccionFisica} onChange={handleChange} />

        <label>País:</label>
        <input type="text" name="pais" value={proveedor.pais} onChange={handleChange} />

        <label>Facturación Anual:</label>
        <input type="number" name="facturacionAnual" value={proveedor.facturacionAnual} onChange={handleChange} />
      </fieldset>

      <button className="btn btn-primary" type="submit">Agregar Proveedor</button>
    </form>
  );
};

export default ProveedorForm;
