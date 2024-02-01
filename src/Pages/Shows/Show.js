import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Show.css';

const Show = () => {
  const [showData, setShowData] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    movieName: '',
    id:''
  });

  const params = useParams();
  const paramId = params.id;

  const getApiData = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data = await response.json();
      setShowData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    const matchingShow = showData.find(show => show.show.id.toString() === paramId);
    setSelectedShow(matchingShow);
  }, [paramId, showData]);

  const handleBookTicket = () => {
    setModalOpen(true);
    setFormData({
      movieName: selectedShow.show.name,
      id:selectedShow.show.id
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('movieDetails', JSON.stringify(formData));
    setModalOpen(false);
  };

  return (
    <div className="show-container">
      {selectedShow ? (
        <div className="show-details">
          <h3>{selectedShow.show.name}</h3>
          <div dangerouslySetInnerHTML={{ __html: selectedShow.show.summary }} />
          <Link to={selectedShow.show.url}>
            <img
              src={selectedShow.show.image.medium}
              alt={`Image of ${selectedShow.show.name}`}
              className="show-image"
            />
          </Link>
          <ul className="stats">
            <li>Genres: {selectedShow.show.genres.join(', ')}</li>
            <li>Status: {selectedShow.show.status}</li>
            <li>Runtime: {selectedShow.show.runtime} minutes</li>
            <li>Rating: {selectedShow.show.rating.average}</li>
          </ul>
          <button onClick={handleBookTicket}>Book Ticket</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {isModalOpen && (
        <div className="modal">
          <form onSubmit={handleFormSubmit}>
            <label>
              Movie Name:
              <input
                type="text"
                name="movieName"
                value={formData.movieName}
                readOnly
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Show;
