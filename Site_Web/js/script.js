// Connexion au broker MQTT (par exemple, un broker public comme HiveMQ)
const client = mqtt.connect('ws://10.7.179.174:9001', {
  username: 'user1',
  password: 'password1'
}); // Utilise WebSocket pour la communication avec le navigateur

// Lorsque la connexion est réussie
client.on('connect', () => {
  console.log('Connecté au broker MQTT');
  
  // Abonnement à un topic pour recevoir des messages
  client.subscribe('iot/test', (err) => {
    if (err) {
      console.log('Erreur d\'abonnement:', err);
    } else {
      console.log('Abonné au topic "iot/test"');
    }
  });
});


// Gérer les messages reçus sur le topic
client.on('message', (topic, message) => {
  console.log(`Message reçu sur le topic ${topic}: ${message.toString()}`);

  // Si tu veux afficher le message dans l'interface, tu peux l'ajouter à un élément HTML
  document.getElementById('temperature').textContent = message.toString(); // Affiche la chaîne de caractère reçue
});

// Données simulées pour les villes de Rhône-Alpes
const weatherData = {
    Lyon: { temperature: 18, humidity: 60 },
    Grenoble: { temperature: 15, humidity: 65 },
    Annecy: { temperature: 12, humidity: 70 },
    Chambéry: { temperature: 14, humidity: 68 },
    Valence: { temperature: 20, humidity: 55 },
  };
  
  // Fonction pour mettre à jour la météo en fonction de la ville sélectionnée
  function updateCityWeather() {
    const citySelect = document.getElementById('city-select');
    const selectedCity = citySelect.value;
  
    // Affiche un loader pendant la mise à jour
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
  
    setTimeout(() => {
      // Si aucune ville n'est sélectionnée, afficher les valeurs par défaut
      if (selectedCity === 'default') {
        document.getElementById('temperature').textContent = '-- °C';
        document.getElementById('humidity').textContent = '-- %';
        loader.style.display = 'none';
        return;
      }
  
      // Récupérer les données météo pour la ville sélectionnée
      const { temperature, humidity } = weatherData[selectedCity];
  
      // Mise à jour des données affichées
      document.getElementById('temperature').textContent = `${temperature} °C`;
      document.getElementById('humidity').textContent = `${humidity} %`;
  
      // Change la couleur de fond selon la température
      if (temperature <= 15) {
        document.body.style.backgroundColor = '#3498db'; // Bleu froid
      } else if (temperature <= 25) {
        document.body.style.backgroundColor = '#f1c40f'; // Jaune doux
      } else {
        document.body.style.backgroundColor = '#e74c3c'; // Rouge chaud
      }
  
      // Cacher le loader après la mise à jour
      loader.style.display = 'none';
    }, 1000); // Simule un délai d'une seconde pour le chargement
  }

 
  