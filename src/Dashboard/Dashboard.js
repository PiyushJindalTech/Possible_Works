import React, { useState, useEffect } from 'react'

export default function Dashboard() {

    const [Product, setProduct] = useState([])
    // const Products = []
    // async function getProducts() {
    //     await fetch('https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json').then(response => response.json())
    //         .then(data => {
    //             for (var key in data.products) {
    //                 Products.push([key,
    //                     data.products[key]['subcategory'],
    //                     data.products[key]['title'],
    //                     data.products[key]['price'],
    //                     data.products[key]['popularity']]);
    //             }

    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }

    React.useEffect(() => {
        async function getProducts() {
            const response = await fetch("https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json");
            const data = await response.json();
            const Products = []
            for (var key in data.products) {
                Products.push([
                    {id: key},
                    {Category: data.products[key]['subcategory']},
                    {Title: data.products[key]['title']},
                    {Price: data.products[key]['price']},
                    {Popularity: data.products[key]['popularity']}
                ]);
            }
            setProduct(Products);
        }
        getProducts();
    }, []);

    return (
        <div>
            <div>Product</div>
            <table>
                <tbody>
                    {

                        Product.map((product) =>
                            <tr>
                                <td>{product.Id}</td>
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
