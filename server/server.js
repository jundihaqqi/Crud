const express =  require('express');
const cors = require('cors');
const {sequelize} = require('./models');
const app = express();
const PORT = 3000;
const kejuruanRoutes = require('./routes/kejuruan.route.js');
const absensiRoutes = require('./routes/absensi.route.js');


app.use(cors());
app.use(express.json());

sequelize.sync()
    .then(() => {
        console.log("mysql db connected")
    })
    .catch(err => {
        console.error("mysql ddb connect failed:", err.message);
    });

app.use('/absensi', absensiRoutes);
app.use('/kejuruan', kejuruanRoutes);

app.listen(PORT, () => {
    console.log(`server berjalan di http://localhost:${PORT}`);
});