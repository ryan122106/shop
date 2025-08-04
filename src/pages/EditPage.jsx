import { useState } from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "sonner";

function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialShops = JSON.parse(localStorage.getItem("shops")) || [];
  const shopToEdit = initialShops.find((s) => s.id === id);

  if (!shopToEdit) {
    toast.error("Restaurant not found");
    navigate("/");
    return null;
  }

  const [shops, setShops] = useState(initialShops);
  const [name, setName] = useState(shopToEdit.name);
  const [cuisine, setCuisine] = useState(shopToEdit.cuisine);
  const [priceRange, setPriceRange] = useState(shopToEdit.priceRange);
  const [location, setLocation] = useState(shopToEdit.location);
  const [occasion, setOccasion] = useState(shopToEdit.occasion);
  const [notes, setNotes] = useState(shopToEdit.notes);

  const handleUpdate = () => {
    if (!name || !cuisine || !priceRange || !location || !occasion) {
      toast.error("Please fill in all fields.");
      return;
    }

    const updatedShops = shops.map((shop) =>
      shop.id === id
        ? { ...shop, name, cuisine, priceRange, location, occasion, notes }
        : shop
    );

    localStorage.setItem("shops", JSON.stringify(updatedShops));
    toast.success("Restaurant updated successfully!");
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Edit Restaurant
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
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save Restaurant
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditPage;
