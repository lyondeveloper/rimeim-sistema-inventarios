import React from 'react';
import PropTypes from 'prop-types';

import isEmty from '../../actions/isEmpty';
import EmptyIcon from './EmptyIcon';
import Spinner from './Spinner';
import { brandsToSelectOptions } from '../../actions/brandActions';
import { vehiclesToSelectOptions } from '../../actions/vehicleActions';

const EditProductCard = props => {
  let productContent;

  if (props.loading) {
    productContent = <Spinner fullWidth />;
  } else if (!isEmty(props.product)) {
    const {
      is_admin,
      onSelectFiles,
      onDeleteClickFile,
      onChangeTextInput,
      onChangeCheckField,
      brands,
      vehicles,
      product: {
        imagenes,
        codigo_barra,
        nombre,
        marca,
        tipo_vehiculo,
        descripcion,
        precio,
        existencia,
        cantidad_minima,
        es_raro
      },
      errors: {
        codigo_barra_error,
        nombre_error,
        descripcion_error,
        precio_error,
        existencia_error,
        cantidad_minima_error
      }
    } = props;

    const vehicleOptions = vehiclesToSelectOptions(vehicles);
    const brandOptions = brandsToSelectOptions(brands);

    productContent = (
      <div className="card">
        <div className="card-content">
          <div className="row">
            <SelectFiles
              id="imagenes"
              label="Imagenes"
              onchange={onSelectFiles}
              onDeleteFileClick={onDeleteClickFile}
              multiple={true}
              files={imagenes}
            />
          </div>
          <div className="row">
            <TextInputField
              id="codigo_barra"
              label="Codigo de barra"
              value={codigo_barra}
              error={codigo_barra_error}
              onchange={onChangeTextInput}
              required={true}
              active_label={true}
            />
          </div>
          <div className="row">
            <TextInputField
              id="nombre"
              label="Nombre"
              value={nombre}
              error={nombre_error}
              onchange={onChangeTextInput}
              required={true}
              active_label={true}
            />
          </div>
          <div className="row">
            <SelectInputField
              id="marca"
              label="Marca"
              value={marca}
              onchange={onChangeTextInput}
              options={brandOptions}
            />
          </div>
          <div className="row">
            <SelectInputField
              id="tipo_vehiculo"
              label="Tipo de vehiculo"
              value={tipo_vehiculo}
              onchange={onChangeTextInput}
              options={vehicleOptions}
            />
          </div>
          <div className="row">
            <TextAreaInputField
              id="descripcion"
              label="Descripcion"
              onchange={onChangeTextInput}
              value={descripcion}
              error={descripcion_error}
              active_label={true}
            />
          </div>

          {is_admin && (
            <div className="row">
              <TextInputField
                id="precio"
                label="Precio"
                type="number"
                onchange={onChangeTextInput}
                value={precio}
                error={precio_error}
                required={true}
                active_label={true}
              />
            </div>
          )}

          <div className="row">
            <TextInputField
              id="existencia"
              label="Existencia"
              type="number"
              onchange={onChangeTextInput}
              value={existencia}
              error={existencia_error}
              required={true}
              active_label={true}
            />
          </div>
          <div className="row">
            <TextInputField
              id="cantidad_minima"
              label="Cantidad minima"
              type="number"
              onchange={onChangeTextInput}
              value={cantidad_minima}
              error={cantidad_minima_error}
              required={true}
              active_label={true}
            />
          </div>
          <div className="row">
            <CheckInputField
              id="es_raro"
              label="Es raro"
              checked={es_raro}
              onchange={onChangeCheckField}
            />
          </div>
        </div>
      </div>
    );
  } else {
    productContent = <EmptyIcon message="No hay informacion para mostrar" />;
  }
  return productContent;
};

EditProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  is_admin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onSelectFiles: PropTypes.func.isRequired,
  onDeleteClickFile: PropTypes.func.isRequired,
  onChangeTextInput: PropTypes.func.isRequired,
  onChangeCheckField: PropTypes.func.isRequired,
  brands: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};

EditProductCard.defaultProps = {
  is_admin: false
};

export default EditProductForm;
