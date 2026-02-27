const app = require("./app");
const sequelize = require("./config/db")

const PORT = process.env.PORT || 5000

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })