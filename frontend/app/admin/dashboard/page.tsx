"use client"
import { useAuth } from "@/hooks/useAuth";
import { AddProductForm } from "@/componenets/products/addProductForm";
import { useState } from "react";
import { Box, Button, Typography, Container, Paper, IconButton } from '@mui/material';
import { Logout, Add } from '@mui/icons-material';

import { useAddProduct } from "@/hooks/useAddProduct";
export default function AdminDashboard() {
  const { handleLogout } = useAuth()
  const [showModel, setShowModal] = useState<boolean>(false)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>

        <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 3 }}>
          <Typography variant="h6" component="h2" mb={2}>
            Product Management
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
            startIcon={<Add />}
            sx={{ mb: 3 }}
          >
            Add Product
          </Button>

          {showModel && (
            <AddProductForm
              onClose={() => setShowModal(false)}
            />
          )}

          {/* Placeholder for product list - you should implement this */}
          <Box
            sx={{
              p: 2,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              backgroundColor: 'background.paper'
            }}
          >
            <Typography color="text.secondary">
              Product list will appear here
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}