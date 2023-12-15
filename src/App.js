// src/components/TrendingTopics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const TrendingTopics = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/trending', {
        searchTerm,
        regionFilter,
        countryFilter,
        ageFilter,
      });

      setTrendingTopics(response.data.topics);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, regionFilter, countryFilter, ageFilter]);

  const handleSearchClick = () => {
    fetchData();
  };

  return (
    <div className="container">
      <h2>Trending Topics</h2>
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="region">Region:</label>
        <input
          type="text"
          id="region"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
        />
      </div>
      <button onClick={handleSearchClick}>Search</button>
      <ul className="result-list">
        {trendingTopics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTopics;
