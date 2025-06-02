import { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import { debounce } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import '../../assets/styles/ProductCategorySearch.css';
import React from "react";
import { Typography } from "@mui/material";

function ProductCategorySearch() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [matched, setMatched] = useState([]);

  const { category } = useParams();
  const navigate = useNavigate();
  const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setAllProducts(data);
      if (category) {
        setProducts(data.filter(p => p.category === category));
      } else {
        setProducts(data);
      }
    } catch (err) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [category]);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce((value) => {
    setSearch(value);
    if (value.trim() === '') {
      setMatched([]);
      setProducts(allProducts);
      return;
    }
    const matchedCategory = categories.filter((cat) =>
      cat.toLowerCase().includes(value.toLowerCase())
    );
    setMatched(matchedCategory);
  }, 100);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  return (
    <div className="product-search-container">
      <Typography variant="h4" className="page-title">Search Products By Category</Typography>

      <input
        type="text"
        className="search-input"
        placeholder="Search Categories..."
        value={search}
        onChange={handleSearch}
      />

      {matched.length > 0 && (
        <ul className="category-list">
          {matched.map((cat) => (
            <li key={cat} className="category-item" onClick={() => handleCategoryClick(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      )}

      <div className="product-list">
        {loading && <Typography variant="body1">Loading...</Typography>}
        {error && <Typography variant="body1">{error}</Typography>}
        {products.length === 0 && !loading && <Typography variant="body1">No products found</Typography>}

        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product.id)}
          >
            <img className="product-image" src={product.image} alt={product.title} />
            <Typography variant="h6" className="product-title">{product.title}</Typography>
            <Typography variant="body2" className="product-category">{product.category}</Typography>
            <Typography variant="body2" className="product-price">₹{(product.price * 83).toFixed(0)}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCategorySearch;
