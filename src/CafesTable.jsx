import React, { useState, useEffect } from 'react';
import FilterCafes from './FilterCafes';

const CafesTable = () => {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [selectedSubway, setSelectedSubway] = useState('All');

  useEffect(() => {
    fetch('http://localhost:8070/cafes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const cafesArray = data.cafes || [];
        setCafes(cafesArray);
        setFilteredCafes(cafesArray);
      })
      .catch(error => {
        console.error('Error fetching cafes:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedSubway === 'All') {
      setFilteredCafes(cafes);
    } else {
      const filtered = cafes.filter(cafe => cafe.subwayCode === selectedSubway);
      setFilteredCafes(filtered);
    }
  }, [selectedSubway, cafes]);

  const handleFilterChange = (subway) => {
    setSelectedSubway(subway);
  };

  return (
    <div id="container" className="container m-3">
      <div className="cafesTable">
        <FilterCafes onFilterChange={handleFilterChange} />
        <ul className="cardsList">
          {filteredCafes.map((cafe) => (
            <li key={cafe.id} className="card">
              <img 
                src={cafe.img || 'https://via.placeholder.com/150'} 
                alt={cafe.name} 
              />
              <h2>{cafe.name}</h2>
              <p>{cafe.desc}</p>
              <p>{cafe.address}</p>
              <p>Subway: {cafe.subwayCode}</p>
              <p>{cafe.workTime}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CafesTable;

