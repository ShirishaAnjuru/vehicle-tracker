const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Endpoint to fetch vehicle location
app.get("/api/vehicle-location", (req, res) => {
  const data = fs.readFileSync(
    path.join(__dirname, "vehicle-data.json"),
    "utf-8"
  );
  const vehicleData = JSON.parse(data);
  const currentLocation = vehicleData.shift(); // Get the first item in the array (simulates movement)

  // Rotate the array to simulate continuous movement
  vehicleData.push(currentLocation);

  // Write the updated data back to the file
  fs.writeFileSync(
    path.join(__dirname, "vehicle-data.json"),
    JSON.stringify(vehicleData, null, 2)
  );

  res.json(currentLocation);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
