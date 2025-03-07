// pages/Dashboard.js
"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { FaBuilding, FaMicrophone, FaUsers, FaHandsHelping, FaCreditCard, FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
// import LeafletMapClient from "../components/LeafletMap";
const LeafletMapClient = dynamic(() => import('../components/LeafletMap'), {
  ssr: false
});

export default function Dashboard() {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [filter, setFilter] = useState("");
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setSites(data))
      .catch(error => console.error('Error fetching sites:', error));
  }, []);

  const handleSiteClick = (coordinates) => {
    setSelectedCoordinates(coordinates);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tableau de bord avec les cartes */}

      <Countdown />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Sites" icon={<FaBuilding />} value={8} />
        <Card title="Présentateurs" icon={<FaMicrophone />} value={12} />
        <Card title="Participants" icon={<FaUsers />} value={150} />
        <Card title="Taux de fidélité" icon={<FaHandsHelping />} value={2000} />
        {/* <Card title="Cartes Distribuées" icon={<FaCreditCard />} value={500} /> */}
      </div>

      {/* Section avec liste de sites et carte Leaflet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des sites */}
        <div className="lg:col-span-1 bg-white shadow-md rounded-lg p-4 h-[100vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Sites</h2>
          <div className="sticky top-0 bg-white z-10">
            <input
              type="text"
              placeholder="Rechercher un site..."
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <ul>
            {sites
              .filter((site) =>
                site.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((site) => (
                <SiteItem key={site.id} site={site} onClick={handleSiteClick} />
              ))}
          </ul>
        </div>
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-4">
          <LeafletMapClient coordinates={selectedCoordinates} />
        </div>
      </div>
    </div>
  );
}

// Composant de carte
function Card({ title, icon, value }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

// function SiteItem({ site }) {
function SiteItem({ site, onClick }) {
  const { name, description, likes, comments, shares, coverImage, coordinates } = site;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <img src={coverImage} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <FaThumbsUp className="mr-1" /> {likes} */}
          </div>
          <div className="flex items-center">
            {/* <FaComment className="mr-1" /> {comments} */}
          </div>
          <div onClick={()=>onClick(coordinates)} className="flex items-center">
            <FaShare className="mr-1" />
            {/* {shares} */}
          </div>
        </div>
      </div>
    </div>
  );
}

const Countdown = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Date cible (par exemple 3 mars 2025)
    const targetDate = new Date("March 2, 2025 18:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        // Calcul du temps restant
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Compte à rebours jusqu'à WAD Impact 2025
        </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <div className="bg-blue-600 text-white py-4 px-6 rounded-lg text-xl shadow-lg">
            <p className="font-bold">{timeRemaining.days}</p>
            <p>Jours</p>
          </div>
          <div className="bg-blue-600 text-white py-4 px-6 rounded-lg text-xl shadow-lg">
            <p className="font-bold">{timeRemaining.hours}</p>
            <p>Heures</p>
          </div>
          <div className="bg-blue-600 text-white py-4 px-6 rounded-lg text-xl shadow-lg">
            <p className="font-bold">{timeRemaining.minutes}</p>
            <p>Minutes</p>
          </div>
          <div className="bg-blue-600 text-white py-4 px-6 rounded-lg text-xl shadow-lg">
            <p className="font-bold">{timeRemaining.seconds}</p>
            <p>Secondes</p>
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          Scrollez vers le bas pour suivre les statistiques généraux en temps réel
        </p>
      </div>
    </div>
  );
};