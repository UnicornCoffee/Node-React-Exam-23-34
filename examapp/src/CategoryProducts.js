import React, { useState, useEffect } from 'react';

const CategoryProducts = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/category/')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, []);

    const fetchProducts = (shortcode) => {
        fetch(`http://127.0.0.1:8000/api/product/?category=${shortcode}`)
            .then(response => response.json())
            .then(data => setProducts(data));
    };

    const handleCategoryChange = (e) => {
        const shortcode = e.target.value;
        setSelectedCategory(shortcode);
        fetchProducts(shortcode);
    };

    return (
        <div>
            <h1>Products by Category</h1>
            <select onChange={handleCategoryChange} value={selectedCategory}>
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category.shortcode} value={category.shortcode}>
                        {category.display_name}
                    </option>
                ))}
            </select>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
