const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Pour le parsing de JSON

const cors = require('cors');
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://leboucqkolia:Lmba.771@cluster0.41nb58t.mongodb.net/monuments', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Modèle de Monument
const monumentSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number
});

const Monument = mongoose.model('Monument', monumentSchema);

// Route d'ajout de monument
app.post('/add-monument', async (req, res) => {
    console.log(req.body); // Cette ligne affiche le corps de la requête dans la console du serveur
    
    const monument = new Monument({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng
    });

    const savedMonument = await monument.save();

    // renvoie le monument sauvegardé en réponse
    res.send(savedMonument);
});

// Route pour obtenir tous les monuments
app.get('/get-monuments', async (req, res) => {
    const monuments = await Monument.find();
    res.send(monuments);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
