import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { toast } from "sonner";
import { nanoid } from "nanoid";

function AddNewShop() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [location, setLocation] = useState("");
  const [occasion, setOccasion] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddNew = () => {
    if (!name || !cuisine || !priceRange || !location || !occasion) {
      toast.error("Please fill in all fields.");
      return;
    }

    const newShop = {
      id: nanoid(),
      name,
      cuisine,
      priceRange,
      location,
      occasion,
      notes,
    };

    const existing = localStorage.getItem("shops");
    const shops = existing ? JSON.parse(existing) : [];

    const updatedShops = [...shops, newShop];
    localStorage.setItem("shops", JSON.stringify(updatedShops));

    toast.success("Restaurant added successfully!");
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Add New Restaurant
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <TextField
          fullWidth
          label="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Cuisine Type"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Price Range (e.g. $, $$, $$$)"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Occasion Type"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Notes / Favorite Dishes"
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" component={RouterLink} to="/">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleAddNew}>
            Save Restaurant
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddNewShop;
