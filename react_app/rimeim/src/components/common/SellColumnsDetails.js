import React from 'react';

const SellColumnsDetails = props => {
  const { colsize, title, value } = props;
  let value_formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <div className={`col ${colsize}`}>
      <p className="d-block">{title}</p>
      <p className="total-number">
        Lps <span>{value_formatted}</span>
      </p>
    </div>
  );
};

SellColumnsDetails.defaultProps = {
  colsize: 's4',
  title: '',
  value: '0.0'
};

export default SellColumnsDetails;
