import app from "./app.js";

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ force: false }); // Use { force: true } to drop and recreate the tables
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing with the database:", error);
  } finally {
    await sequelize.close(); // Close the connection when done
  }
})();
