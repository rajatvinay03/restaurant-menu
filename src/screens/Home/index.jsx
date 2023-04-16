import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  Box,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Paper,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

export default function Home() {
  const [data, setdata] = useState("");
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  

  const fetchData = async (e) => {
    axios
      .get(
        "https://apiqav3.fleksa.com/v1/api/mf/menu/shop/ffc65c89-2112-4b8a-93dc-f64a8e01dcca"
      )
      .then((res) => {
        setdata(res.data?.data);
        const items = Object.values(res.data?.data?.menu_sections);
        if (searchQuery) {
          setItems(
            items.filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        } else {
          setItems(items);
        }
        if (filter) {
          items = items.filter((item) => item.category === filter);
        }
        if (searchQuery) {
          items = items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        setItems(items);
      });
  };

  //   console.log(Object.entries(data?.menu_sections));

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h5" textAlign={"center"}>
          {data?.name}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mr: 2 }} // add margin to the right
          />
           </Box>

        <Box>
          <Grid container spacing={2}>
            {items?.filter((f)=>{if(searchQuery === ""){ return f }else if(f?.name.toLowerCase().includes(searchQuery.toLowerCase())) return f }).filter((x)=>{if(x?.is_active) return x}).map((e) => {
              return (
                <Grid xs={3} key={e?.id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image={e?.image_url}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {e?.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                    <CardActions>
                      <Button size="small" onClick={() => handleAddToCart(e)}>Add to Cart</Button>
                    </CardActions>
                  </Card>
                </Grid>
                
              );
            })}
          </Grid>
        </Box>
        <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontSize: "1.5rem", color: "blue", border: "1px solid gray", padding: "5px" }}>
        Cart
      </Typography>

            {cartItems.map((item) => (
              <Typography key={item.id} variant="subtitle1">
                {item.name}
              </Typography>
            ))}
        </Box>

      </Container>
    </>
  );
}
