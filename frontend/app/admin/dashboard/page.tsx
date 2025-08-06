"use client"
import { useAuth } from "@/hooks/useAuth";
import { AddProductForm } from "@/componenets/products/addProductForm";
import { useState } from "react";
import { Box, Button, Typography, Container, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Logout, Add } from '@mui/icons-material';
import { useGetProducts } from "@/hooks/useGetProducts";

export default function AdminDashboard() {
  const { handleLogout } = useAuth();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { products, isLoading } = useGetProducts();

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

          {showModal && (
            <AddProductForm
              onClose={() => setShowModal(false)}
            />
          )}

          {isLoading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <Typography>Loading products...</Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell align="right">{product.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Container>
  );
}