import { Edit, Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";

import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@mui/material";
import { toast } from "sonner";

function RandomPickerPage() {
  const shopsLocalStorage = localStorage.getItem("shops");
  const [shops, setShops] = useState(
    shopsLocalStorage ? JSON.parse(shopsLocalStorage) : []
  );
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedOccasion, setSelectedOccasion] = useState("all");

  const filteredshops = shops.filter((r) => {
    return (
      (selectedCuisine === "all" || r.cuisine === selectedCuisine) &&
      (selectedPrice === "all" || r.priceRange === selectedPrice) &&
      (selectedLocation === "all" || r.location === selectedLocation) &&
      (selectedOccasion === "all" || r.occasion === selectedOccasion)
    );
  });

  const handleUpdate = (shop) => {
    const newShop = prompt(
      "Please enter the new shop for the selected shop.",
      shop.shop
    );
    if (newShop) {
      const updatedShops = [...shops];
      setShops(
        updatedShops.map((cat) => {
          if (cat.id === shops.id) {
            cat.shop = newShop;
          }
          return cat;
        })
      );
      toast("Shop has been updated");
      localStorage.setItem("shops", JSON.stringify(updatedShops));
    }
  };
  const getUniqueValues = (key) => {
    const allValues = shops.map((shop) => shop[key]);
    return Array.from(new Set(allValues));
  };

  const handleDelete = (shopToDelete) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      const updatedShops = shops.filter((shop) => shop.id !== shopToDelete.id);
      setShops(updatedShops);
      toast("Shop has been deleted");
      localStorage.setItem("shops", JSON.stringify(updatedShops));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          My Shops
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
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
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Price</InputLabel>
              <Select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
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
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
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
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
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
          </Grid>
        </Grid>
      </Paper>
     
      {/* Shop List */}
      {filteredshops.length > 0 ? (
        <Grid container spacing={3}>
          {filteredshops.map((shop) => (
            <Grid item xs={12} sm={6} md={4} key={shop.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "medium" }}>
                    {shop.name}
                  </Typography>

                  <Box
                    sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={shop.cuisine}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={shop.priceRange}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                    <Chip
                      label={shop.location}
                      size="small"
                      color="info"
                      variant="outlined"
                    />
                    <Chip
                      label={shop.occasion}
                      size="small"
                      color="info"
                      variant="outlined"
                    />
                  </Box>

                  {shop.notes && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {shop.notes}
                    </Typography>
                  )}

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Edit fontSize="small" />}
                      component={RouterLink}
                      to={`/n/${shop.id}`}
                      sx={{ textTransform: "none" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      startIcon={<Delete fontSize="small" />}
                      onClick={() => handleDelete(shop)}
                      sx={{ textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            No shops found matching your type.
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default RandomPickerPage;
