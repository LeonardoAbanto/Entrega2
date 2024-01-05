import React, { useState, useEffect } from 'react';

const ProveedorForm = ({ onSubmit, cerrarFormulario, proveedorEdit }) => {

  const initialState = {
  RazonSocial: '',
  NombreComercial: '',
  IdentificacionTributaria: '',
  NumeroTelefonico: '',
  CorreoElectronico: '',
  SitioWeb: 'https://',
  DireccionFisica: '',
  Pais: '',
  FacturacionAnual: 0,
  FechaUltimaEdicion: '2024-01-03T10:34:53.44',}

  const [proveedor, setProveedor] = useState(initialState);

  useEffect(() => {
    // Cuando el componente se monta o cambia proveedorEdit, actualiza el estado del formulario
    setProveedor(proveedorEdit || initialState);
  }, [proveedorEdit]);

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
        body: JSON.stringify({ ...proveedor, FacturacionAnual: Number(proveedor.FacturacionAnual), fechaUltimaEdicion: new Date().toISOString(), }),
      });
        console.log(JSON.stringify({ ...proveedor, FacturacionAnual: Number(proveedor.FacturacionAnual), fechaUltimaEdicion: new Date().toISOString().slice(0, -1), }),
        )
      if (response.ok) {
        console.log('Proveedor insertado exitosamente');
        onSubmit(); // Llamada a la función del padre para recargar la lista de proveedores
      } else {
        // Almacenar el resultado de response.json() en una variable
        const errorResponse = await response.json();
    
        console.error('Error al insertar proveedor:', response);
        console.error('Detalles del error:', errorResponse);
    
        // Puedes manejar el error de alguna manera
      }
    } catch (error) {
      console.error('Error al insertar proveedor:', error);
      // Manejo de errores
    } finally {
      cerrarFormulario(); // Cerrar el formulario independientemente del resultado de la inserción
    }
    
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:5001/api/proveedores/${proveedor.id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...proveedor, FacturacionAnual: Number(proveedor.FacturacionAnual), fechaUltimaEdicion: new Date().toISOString(), }),
      });
      if (response.ok) {
        console.log('Proveedor insertado exitosamente');
        onSubmit(); // Llamada a la función del padre para recargar la lista de proveedores
      } else {
        // Almacenar el resultado de response.json() en una variable
        const errorResponse = await response.json();
    
        console.error('Error al insertar proveedor:', response);
        console.error('Detalles del error:', errorResponse);
    
        // Puedes manejar el error de alguna manera
      }
    } catch (error) {
      console.error('Error al insertar proveedor:', error);
      // Manejo de errores
    } finally {
      cerrarFormulario(); // Cerrar el formulario independientemente del resultado de la inserción
    }
  }


  return (
    <form onSubmit={ proveedorEdit ? (handleEdit) : (handleSubmit)}>
      <fieldset>
        {proveedorEdit ? (<legend>Editar Proveedor {proveedor.id} - {proveedor.NombreComercial}</legend>) : (<legend>Información del Proveedor</legend>)}

        <label>Razón Social: </label>
        <input type="text" name="RazonSocial" value={proveedor.RazonSocial} onChange={handleChange} required />
        <p></p>

        <label>Nombre Comercial: </label>
        <input type="text" name="NombreComercial" value={proveedor.NombreComercial} onChange={handleChange} required />
        <p></p>

        <label>Identificación Tributaria: </label>
        <input type="text" name="IdentificacionTributaria" value={proveedor.IdentificacionTributaria} onChange={handleChange} minLength={11} maxLength={11} required/>
        <p></p>

        <label>Número Telefónico: </label>
        <input type="number" name="NumeroTelefonico" value={proveedor.NumeroTelefonico} onChange={handleChange} required />
        <p></p>

        <label>Correo Electrónico: </label>
        <input type="text" name="CorreoElectronico" value={proveedor.CorreoElectronico} onChange={handleChange} required/>
        <p></p>

        <label>Sitio Web: </label>
        <input type="url" name="SitioWeb" value={proveedor.SitioWeb} onChange={handleChange} required/>
        <p></p>

        <label>Dirección Física: </label>
        <input type="text" name="DireccionFisica" value={proveedor.DireccionFisica} onChange={handleChange} required/>
        <p></p>

        <label>País: </label>
        <select name="Pais" value={proveedor.Pais} onChange={handleChange} required>
          <option value="">Selecciona un país</option>
          <option value="Peru">Perú</option>
          <option value="Mexico">México</option>
          <option value="Argentina">Argentina</option>
        </select>
        <p></p>

        <label>Facturación Anual: </label>
        <input type="number" name="FacturacionAnual" value={parseFloat(proveedor.FacturacionAnual)} onChange={handleChange} required/>
      </fieldset>
      <p></p>

      <button className="btn btn-primary" type="submit">Agregar Proveedor</button>
      <p></p>
    </form>
   

  );
};

export default ProveedorForm;
