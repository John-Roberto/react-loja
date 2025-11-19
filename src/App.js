import { useEffect, useState } from "react";
import Cart from "./componentes/Cart";
import Products from "./componentes/Products";
import 'bootstrap/dist/css/bootstrap.min.css'; // Garanta que importou o CSS aqui

/* ... (Mantenha as funções api, apiGetProducts e apiSubmitCart iguais) ... */
async function api(url, method, body = undefined) {
  return await fetch(`http://localhost:4000${url}`, {
    body: body !== undefined ? JSON.stringify(body) : body,
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

async function apiGetProducts() {
  const data = await api("/products", "GET");
  return data.products;
}

async function apiSubmitCart(products) {
  await api("/purchases", "POST", { products });
}
/* ... Fim das funções API ... */


function App() {
  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  
  async function getProducts() {
    setProductsLoading(true);
    setProducts(await apiGetProducts());
    setProductsLoading(false);
  }

  async function submitCart() {
    setCartLoading(true);
    await apiSubmitCart(cart);
    setCart([]);
    setCartLoading(false);
    getProducts();
  }

  function setProduct(product, change) {
    const products = cart.filter(({ id }) => {
      return id !== product.id;
    });

    product.units += change;
    if (product.units > 0) {
      // Correção sutil: removido o nesting duplo [[...]] que parecia um erro no original
      setCart(() => [...products, product]); 
    } else {
      setCart(() => [...products]);
      setProducts((LastProducts) => [...LastProducts, product]);
    }
  }

  function addProduct(product) {
    product.units = 1;
    setCart(() => [...cart, product]);

    setProducts(() => 
      products.filter(({ id }) => {
        return id !== product.id;
      })
    );
  }
  
  useEffect(() => {
    getProducts();
  }, []);

  return(
    <main className="container-fluid vh-100 overflow-hidden">
      <div className="row h-100">
        {/* Coluna do Carrinho (Esquerda) */}
        <div className="col-12 col-md-4 col-lg-3 bg-white border-end shadow-sm h-100 d-flex flex-column">
          <Cart 
            products={cart}
            onChange={setProduct}
            onClick={submitCart}
            isLoading={cartLoading}
          />
        </div>

        {/* Coluna dos Produtos (Direita) */}
        <div className="col-12 col-md-8 col-lg-9 h-100 overflow-auto bg-light">
          <Products 
            products={products}
            onClick={addProduct}
            isLoading={productsLoading}
          />
        </div>
      </div>
    </main>
  );
}

export default App;