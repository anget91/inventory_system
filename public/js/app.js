document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

function fetchProducts() {
  fetch('/api/products')
      .then(response => response.json())
      .then(products => {
          const productTableBody = document.getElementById('productTableBody');
          productTableBody.innerHTML = '';
          products.forEach(product => {
              const row = `
                  <tr>
                      <td>${product.id}</td>
                      <td>${product.name}</td>
                      <td>${product.description}</td>
                      <td>${product.price}</td>
                      <td>${product.quantity}</td>
                      <td>
                          <button class="btn btn-warning btn-sm" onclick="openEditModal(${product.id}, '${product.name}', '${product.description}', ${product.price}, ${product.quantity})">Edit</button>
                          <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${product.id})">Delete</button>
                      </td>
                  </tr>
              `;
              productTableBody.innerHTML += row;
          });
      })
      .catch(error => console.error('Error fetching products:', error));
}

function openEditModal(id, name, description, price, quantity) {
  document.getElementById('editProductId').value = id;
  document.getElementById('editProductName').value = name;
  document.getElementById('editProductDescription').value = description;
  document.getElementById('editProductPrice').value = price;
  document.getElementById('editProductQuantity').value = quantity;
  $('#editProductModal').modal('show');
}

document.getElementById('editProductForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('editProductId').value;
  const name = document.getElementById('editProductName').value;
  const description = document.getElementById('editProductDescription').value;
  const price = document.getElementById('editProductPrice').value;
  const quantity = document.getElementById('editProductQuantity').value;

  const changes = {};

  if (name) changes.name = name;
  if (description) changes.description = description;
  if (price) changes.price = price;
  if (quantity) changes.quantity = quantity;

  fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(changes)
  })
  .then(() => {
      $('#editProductModal').modal('hide');
      fetchProducts();
  })
  .catch(error => console.error('Error updating product:', error));
});

function openDeleteModal(id) {
  $('#deleteProductModal').modal('show');
  document.getElementById('confirmDeleteProductBtn').onclick = function () {
      deleteProduct(id);
  };
}

function deleteProduct(id) {
  fetch(`/api/products/${id}`, {
      method: 'DELETE'
  })
  .then(() => {
      $('#deleteProductModal').modal('hide');
      fetchProducts();
  })
  .catch(error => console.error('Error deleting product:', error));
}

document.getElementById('addProductForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('addProductName').value;
  const description = document.getElementById('addProductDescription').value;
  const price = document.getElementById('addProductPrice').value;
  const quantity = document.getElementById('addProductQuantity').value;

  const newProduct = {
      name,
      description,
      price,
      quantity
  };

  fetch('/api/products', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
  })
  .then(() => {
      $('#addProductModal').modal('hide');
      fetchProducts();
  })
  .catch(error => console.error('Error adding product:', error));
});
