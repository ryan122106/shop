import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";

function RandomPicker() {
  const shopsInLocalStorage = localStorage.getItem("shops");
  const [shops] = useState(
    shopsInLocalStorage ? JSON.parse(shopsInLocalStorage) : []
  );
  const getUniqueValues = (key) => {
    const allValues = shops.map((shop) => shop[key]);
    return Array.from(new Set(allValues));
  };

  const [price, setPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [result, setResult] = useState(null);

  const handlePick = () => {
    const filtered = shops.filter((shop) =>
    (price === "all" || shop.priceRange === price) &&
    (selectedLocation === "all" || shop.location === selectedLocation) &&
    (selectedCuisine === "all" || shop.cuisine === selectedCuisine) &&
    (selectedOccasion === "all" || shop.occasion === selectedOccasion)
  );

    if (filtered.length === 0) {
      setResult(null);
    } else {
      const random = filtered[Math.floor(Math.random() * filtered.length)];
      setResult(random);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        🎲 Random Restaurant Picker
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Location</InputLabel>
        <Select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          label="Location"
        >
          <MenuItem value="all">All Locations</MenuItem>
          {getUniqueValues("location").map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: "10px" }}>
        <InputLabel>Price</InputLabel>
        <Select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
        >
          <MenuItem value="all">All Prices</MenuItem>
          {getUniqueValues("priceRange").map((price) => (
            <MenuItem key={price} value={price}>
              {price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: "10px" }}>
        <InputLabel>Cuisine</InputLabel>
        <Select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          label="Cuisine"
        >
          <MenuItem value="all">All Cuisines</MenuItem>
          {getUniqueValues("cuisine").map((cuisine) => (
            <MenuItem key={cuisine} value={cuisine}>
              {cuisine}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: "10px" }}>
        <InputLabel>Occasion</InputLabel>
        <Select
          value={selectedOccasion}
          onChange={(e) => setSelectedOccasion(e.target.value)}
          label="Occasion"
        >
          <MenuItem value="all">All Occasions</MenuItem>
          {getUniqueValues("occasion").map((oc) => (
            <MenuItem key={oc} value={oc}>
              {oc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        onClick={handlePick}
        sx={{ mt: 2 }}
      >
        Pick Random Restaurant
      </Button>

      {result && (
        <Card elevation={4} sx={{ mt: 5 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {result.name}
            </Typography>
            <Typography>Cuisine: {result.cuisine}</Typography>
            <Typography>Price: {result.priceRange}</Typography>
            <Typography>Location: {result.location}</Typography>
            <Typography>Occasion: {result.occasion}</Typography>
          </CardContent>
        </Card>
      )}

      {result === null && (
        <Typography sx={{ mt: 5 }} align="center" color="text.secondary">
          No matching restaurants found.
        </Typography>
      )}
    </Container>
  );
}

export default RandomPicker;
