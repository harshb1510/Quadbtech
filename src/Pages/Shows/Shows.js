import React, { useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';

function Shows() {
  const [showData, setShowData] = useState([]);

  const getapiData = async () => {
    const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
    const data = await response.json();
    setShowData(data);
  };

  useEffect(() => {
    getapiData();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '' }}>
      <div>
        <div className='heading'>TV Shows</div>
      </div>
      <div className="page-content">
        {showData?.map((show) => (
            <Card
              key={show.show.id}
              title={show.show.name}
              copy={show.show.summary}
              button="View Details"
              image={show.show.image?.medium}
              id={show.show.id}
              />
        ))}
      </div>
    </div>
  );
}

export default Shows;
