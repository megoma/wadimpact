// pages/Dashboard.js
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  FaBuilding,
  FaMicrophone,
  FaUsers,
  FaHandsHelping,
  FaMapMarked,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// import LeafletMapClient from "../components/LeafletMap";
const LeafletMapClient = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
});

export default function Dashboard() {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [filter, setFilter] = useState("");
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setSites(data))
      .catch((error) => console.error("Error fetching sites:", error));
  }, []);

  const handleSiteClick = (coordinates) => {
    setSelectedCoordinates(coordinates);
  };

  return (
    <div className="w-full h-screen">
      {/* Tableau de bord avec les cartes */}

      {/* <Countdown /> */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="p-4 flex items-center justify-center text-xl md:text-2xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 253.71 227.63"
            className="w-20 h-20 fill-black mr-4"
          >
            <title>icon-logo</title>
            <path d="M67.68,120.38c-.1-9.91,2.8-18.41,20.8-36.41l39-39c10.4-10.4,19.1-19.29,19.1-29V.67c0-.89-1.1-.89-1.2,0-2.6,12.4-7.5,17.3-17.8,27.61L82.28,73.47c-17.1,17-19.5,35.1-15.8,46.91C66.78,121.38,67.68,121.47,67.68,120.38Zm64.2,38.9c0,.89,1,.89,1.2,0,2.6-12.5,7.6-17.4,17.8-27.61L166,116.78c19.8-19.9,10.7-39-.9-44.31-1-.5-1.4.31-.6,1,9.3,8,6.5,21.5-5.2,33.2L151,115c-10.4,10.31-19.1,19.2-19.1,29Zm81.8,26.6L168,178.17l-17.1,17.11c-10.4,10.39-19,19.3-19,29V227c0,.7.9.9,1.2.11,3.2-8.7,13.9-18.11,33.5-14.8,0,0,85.4,14.8,86.1,14.8a.9.9,0,0,0,1-.61.79.79,0,0,0-.2-.8c-.3-.39-39.8-39.8-39.8-39.8Zm-107.5,1h15a.66.66,0,0,0,.6-.6c0-7.9-6-13.31-30-9.2L40,186S.58,225.37.28,225.78a.79.79,0,0,0-.1,1.1.81.81,0,0,0,.8.2c.7-.11,86.1-14.8,86.1-14.8,19.6-3.31,30.3,6,33.5,14.8.3.8,1.2.7,1.2-.11v-29.5a.66.66,0,0,0-.6-.6l-15,.1a.64.64,0,0,1-.6-.6v-8.9a.65.65,0,0,1,.6-.6Zm26.8,25.9a36.3,36.3,0,0,1,6.9-15.81h-7.5a.65.65,0,0,0-.6.61v15.2c0,.89,1.1.89,1.2,0Zm13.6-158.6c0-.91-1.1-.91-1.2,0-2.6,12.39-7.5,17.29-17.8,27.6l-39.8,39.69c-19.8,19.81-10.7,39,.9,44.31,1,.5,1.4-.4.6-1-9.3-8-6.5-21.61,5.2-33.2l33-33c10.4-10.4,19.1-19.3,19.1-29Zm-19.1,17.49c10.4-10.3,19-19.2,19.1-29V27.27c0-.9-1.1-.9-1.2,0-2.6,12.4-7.5,17.4-17.8,27.7L86.68,95.78c-19.8,19.8-23.3,39-13.2,51.4.7.8,1.4.3,1-.7-6.7-15.1,9.3-31.1,16.9-38.7Zm37.6,82.5-14.3,14.2c-6.5,6.5-12.3,12.4-15.8,18.4h14.1l1.7-1.7,20.5-20.5c17.1-16.9,19.5-35,15.8-46.8-.3-1-1.2-1.1-1.2,0,.1,9.9-2.8,18.4-20.8,36.4Zm-2.8-24-11.4,11.5c-10.4,10.4-19.1,19.4-19.1,29.11v15.3c0,.89,1.1.89,1.2,0,2.6-12.4,7.5-17.4,17.8-27.7L167,142.17c19.8-19.8,23.3-39,13.2-51.4-.7-.8-1.4-.3-1,.7C185.88,106.57,169.88,122.57,162.28,130.17Zm83.5,68.2h1.1l1.7,3h1.5l-2-3.3a2,2,0,0,0,1.3-2c0-1.5-.8-2.2-2.7-2.2h-2.2v7.5h1.3v-3Zm0-3.5h.8c1,0,1.4.3,1.4,1.2,0,.7-.5,1.2-1.4,1.2h-.9v-2.4Zm1,9a6.3,6.3,0,1,0-6.3-6.3,6.08,6.08,0,0,0,5.87,6.3Zm0-11.7a5.4,5.4,0,1,1,0,10.8,5.31,5.31,0,0,1-5.4-5.23h0v-.16a5.24,5.24,0,0,1,5.11-5.39h.29Z"></path>
          </svg>
          WAD Impact 2025
        </div>
        <div className="p-8 w-full md:w-[500px]">
          <CustomSelect options={sites} onSelect={handleSiteClick} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4 px-8">
        <Card title="Sites" icon={<FaBuilding />} value={8} />
        <Card title="Présentateurs" icon={<FaMicrophone />} value={12} />
        <Card title="Participants" icon={<FaUsers />} value={150} />
        <Card
          title="Taux de fidélité"
          icon={<FaHandsHelping />}
          value={"99%"}
        />
        {/* <Card title="Cartes Distribuées" icon={<FaCreditCard />} value={500} /> */}
      </div>

      {/* Section avec liste de sites et carte Leaflet */}
      <div className="flex flex-col md:flex-row gap-6 px-8">
        {/* Liste des sites */}
        {/* <div className="bg-white w-full md:w-1/3 shadow-lg rounded-lg px-4 h-[500px] md:h-screen overflow-y-auto no-scrollbar">
          <div className="sticky top-0 bg-white z-10">
            <h2 className="text-xl font-semibold my-4">Sites</h2>
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
        </div> */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden h-96 mb-2 w-full md:w-1/2">
          <LeafletMapClient coordinates={selectedCoordinates} />
        </div>
        <div className=" h-96 w-full md:w-1/2">
          <Graph />
        </div>
      </div>
    </div>
  );
}

// Composant de carte
function Card({ title, icon, value }) {
  return (
    <div className="bg-white shadow-xl rounded-lg p-4 text-center text-black">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

// function SiteItem({ site }) {
function SiteItem({ site, onClick }) {
  const {
    name,
    description,
    likes,
    comments,
    shares,
    coverImage,
    coordinates,
  } = site;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <img src={coverImage} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <FaThumbsUp className="mr-1" /> {likes} */}
          </div>
          <div className="flex items-center">
            {/* <FaComment className="mr-1" /> {comments} */}
          </div>
          <div
            onClick={() => onClick(coordinates)}
            className="flex items-center cursor-pointer"
          >
            <FaMapMarked className="mr-1 text-xl" />
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
    seconds: 0,
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
          seconds: 0,
        });
      } else {
        // Calcul du temps restant
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-600 to-yellow-200">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Compte à rebours jusqu&apos;à WAD Impact 2025
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
          Scrollez vers le bas pour suivre les statistiques généraux en temps
          réel
        </p>
      </div>
    </div>
  );
};

const Graph = () => {
  const data = {
    labels: [
      "Jour 1",
      "Jour 2",
      "Jour 3",
      "Jour 4",
      "Jour 5",
      "Jour 6",
      "Jour 7",
      "Jour 8",
      "Jour 9",
      "Jour 10",
      "Jour 11",
      "Jour 12",
      "Jour 13",
      "Jour 14",
    ],
    datasets: [
      {
        label: "Participants",
        data: [30, 50, 40, 60, 80, 70, 80],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return <Line data={data} options={options} />;
};

const CustomSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Gérer la sélection d'une option
  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option.coordinates); // Passer l'option sélectionnée au parent
    setIsOpen(false); // Fermer la liste des options
  };

  // Fermer la liste des options si on clique en dehors
  const handleClickOutside = (event) => {
    if (!event.target.closest(".custom-select")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select relative max-w-md mx-auto">
      {/* Bouton pour afficher les options */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white p-3 rounded-lg shadow-md flex items-center justify-between"
      >
        {selectedOption ? (
          <div className="flex items-center">
            <img
              src={selectedOption.coverImage}
              alt={selectedOption.name}
              className="w-6 h-6 rounded-full mr-3"
            />
            <span>{selectedOption.name}</span>
          </div>
        ) : (
          <span>Tous les sites</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Liste des options */}
      {isOpen && (
        <div className="absolute w-full bg-white rounded-lg shadow-md mt-2 z-10 max-h-screen overflow-y-auto no-scrollbar">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="option p-3 hover:bg-gray-100 cursor-pointer flex items-center "
            >
              <img
                src={option.coverImage}
                alt={option.name}
                className="w-32 h-32 rounded-md mr-3"
              />
              <div>
                <p className="text-lg font-semibold">{option.name}</p>
                <p>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
