import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ title ,image,id }) => {
  return (
    <Link to={`/show/${id}`}>
    <div className="card">
        <img src={image} alt="" className='movieImage' />
      <div className="content">
        <div className="title">{title}</div>
      </div>
    </div>
    </Link>
  );
};

export default Card;
