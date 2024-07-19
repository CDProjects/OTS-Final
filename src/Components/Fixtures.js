import React, { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import './Fixtures.css';
import shamrocksHRC2024 from '../Images/HRC Shamrocks 2024.jpg';

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
    { date: "1.6", teams: "SHAMROCKS - TAMPERE", score: "26 - 14" },
    { date: "15.6", teams: "SHAMROCKS - WARRIORS", score: "21 - 38" },
    { date: "29.6", teams: "SHAMROCKS - EAGLES", score: "41 - 14" },
    { date: "13.7", teams: "SHAMROCKS - HELSINKI", score: "26 - 12" },
    { date: "20.7", teams: "HELSINKI - SHAMROCKS", score: "00 - 00" },
    { date: "3.8", teams: "WARRIORS - SHAMROCKS", score: "00 - 00" },
    { date: "17.8", teams: "TAMPERE - SHAMROCKS", score: "00 - 00" },
    { date: "24.8", teams: "KALEV - SHAMROCKS", score: "00 - 00" },
    { date: "31.8", teams: "EAGLES - SHAMROCKS", score: "00 - 00" },
    { date: "14.9", teams: "SHAMROCKS - KALEV", score: "00 - 00" },
    { date: "21.9", teams: "SEMI FINAL", score: "TBD" },
    { date: "28.9", teams: "CHAMPIONSHIP FINAL", score: "TBD" },
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
          <h2 className="fixtures-subtitle">2024 Championship</h2>
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