import React, { useState, useEffect, useRef } from 'react'
import './Dashboard.css'

export default function Dashboard() {

    const [Product, setProduct] = useState([])
    const [ProductData, setProductData] = useState([])
    const filterValueRef = useRef('')
    const filterTypeRef = useRef('')

    async function getProducts() {
        const response = await fetch("https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json");
        const data = await response.json();

        let Products = []
        for (var key in data.products) {
            Products.push(
                {
                    id: key,
                    Category: data.products[key]['subcategory'],
                    Title: data.products[key]['title'],
                    Price: data.products[key]['price'],
                    Popularity: data.products[key]['popularity']
                }
            );
        }
        setProduct(Products);
        setProductData(Products)
    }

    useEffect(() => {
        getProducts();
    }, []);

    const onSearchHandler = () => {
        const filterValue = filterValueRef.current.value;
        const filterType = filterTypeRef.current.value;
        const filteredProduct = ProductData.filter(p => p[filterType] === filterValue)
        setProduct(filteredProduct)
    }

    return (
        <div>
            <div>Product</div>


            <div className="filter">
                <input type="text" ref={filterValueRef}></input>
                <select id="dropdown" ref={filterTypeRef}>
                    <option value="0">--Select--</option>
                    <option value="Category">Category</option>
                    <option value="Title">Title</option>
                    <option value="Price">Price</option>
                    <option value="Popularity">Popularity</option>
                </select>
                <input type="button" value="Search" onClick={onSearchHandler} />
            </div>

            <table>
                <thead>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Popularity</th>
                </thead>
                <tbody>
                    {

                        Product.map((product) =>
                            <tr key={product.id}>
                                <td>{product.Category}</td>
                                <td>{product.Title}</td>
                                <td>{product.Price}</td>
                                <td>{product.Popularity}</td>
                            </tr>
                        )

                    }
                </tbody>
            </table>
        </div>
    )
}
