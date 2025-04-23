import React, { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './Fixtures.css';
import shamrocksHRC2024 from '../Images/Games 2025.jpeg';

const Fixtures = () => {
  const [competitionTable, setCompetitionTable] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/competitionTable.html')
      .then(response => response.text())
      .then(data => {
        // Parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Modify the structure of the second column
        const cells = doc.querySelectorAll('td:nth-child(2)');
        cells.forEach(cell => {
          const img = cell.querySelector('img');
          const text = cell.textContent.trim();
          cell.innerHTML = `
            <div class="team-info">
              ${img ? img.outerHTML : ''}
              <span>${text}</span>
            </div>
          `;
        });

        // Convert back to string
        setCompetitionTable(doc.body.innerHTML);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const fixturesData = [
    { date: "24.5", teams: "SHAMROCKS - EAGLES", score: "0 - 0" },
    { date: "14.6", teams: "SHAMROCKS - KALEV", score: "0 - 0" },
    { date: "28.6", teams: "SHAMROCKS - TAMPERE", score: "0 - 0" },
    { date: "5.7", teams: "EAGLES - SHAMROCKS", score: "0 - 0" },
    { date: "12.7", teams: "SHAMROCKS - WARRIORS", score: "0 - 0" },
    { date: "26.7", teams: "KALEV - SHAMROCKS", score: "0 - 0" },
    { date: "9.8", teams: "HELSINKI - SHAMROCKS", score: "0 - 0" },
    { date: "16.8", teams: "TAMPERE - SHAMROCKS", score: "0 - 0" },
    { date: "30.8", teams: "WARRIORS - SHAMROCKS", score: "0 - 0" },
    { date: "6.9", teams: "SHAMROCKS - HELSINKI", score: "0 - 0" },
    { date: "TBA", teams: "SEMI-FINAL", score: "0 - 0" },
    { date: "TBA", teams: "GRAND FINAL", score: "0 - 0" },
  ];

  return (
    <ErrorBoundary>
      <section id="fixtures-section" className="fixtures-section">
        <div id="fixtures-marker"></div>
        <div className="content-container">
          <h1 className="section-title">RESULTS & FIXTURES</h1>
        </div>
        
        {isLoading && <p>Loading competition table...</p>}
        {error && <p>Error loading competition table: {error.message}</p>}
        {competitionTable && (
          <div className="competition-table-wrapper">
          <div className="competition-table" dangerouslySetInnerHTML={{ __html: competitionTable }} />
        </div>
        )}

        <picture>
          <source srcSet={shamrocksHRC2024.replace('.jpg', '.webp')} type="image/webp" />
          <img src={shamrocksHRC2024} alt="3rd game 13th July 2024" className="fixtures-picture" />
        </picture>
        
        <div className="content-container">
          <h2 className="fixtures-subtitle">2025 Championship</h2>
          <h3 className="fixtures-subtitle">OTS FIXTURES &amp; RESULTS</h3>
          
          {fixturesData.map((fixture, index) => (
            <p key={index} className="fixtures-text">
              <span className="date">{fixture.date}</span>
              <span className="teams">{fixture.teams}</span>
              <span className="score"><b>{fixture.score}</b><br /></span>
            </p>
          ))}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default React.memo(Fixtures);