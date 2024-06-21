import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'


const Edit = ({ token }) => {

    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const expense = () => axios({
        method: 'get',
        url: `/api/sales/products/${id}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {

            if (await response.data.data) {
                setName(response.data.data.name);
                setPrice(response.data.data.price);
                setStock(response.data.data.stock);
                setCategoryId(response.data.data.category_id);
                setDescription(response.data.data.description)
                setLoading(false);
            }
            console.log(response.data)
        }).catch((err) => {

            console.log(err)
        });

    const [expenseType, setExpenseType] = useState(expense);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [category_id, setCategoryId] = useState(null);
    const [description, setDescription] = useState([]);

    const fetchCategory = () => axios({
        method: 'get',
        url: '/api/sales/categories',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(async function (response) {
            if (await response.data.data) {
                console.log(response.data.data)
                setCategories(response.data.data);
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err)
        });

    const [categories, setCategories] = useState(fetchCategory);

    function Submit(e) {
        e.preventDefault();
        axios({
            method: "put",
            url: `/api/sales/products/${id}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: name,
                description: description,
                price: price,
                category_id: category_id,
                stock: stock
            },
        })
            .then(() => {
                navigate("/products");
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "40px",
            }}
        >
            <div
                style={{
                    width: "90%",
                    border: "1px solid grey",
                    padding: "20px",
                }}
            >
                <Breadcrumbs
                    style={{
                        background: "#f7f7f7",
                        padding: "7px 10px",
                        marginBottom: "20px",
                    }}
                    aria-label="breadcrumb"
                >
                    <Link
                        style={{
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            color: "#9a8888",
                        }}
                        to="/"
                    >
                        <HomeIcon
                            style={{ fontSize: "20px", marginRight: "10px" }}
                        />{" "}
                        Dashboard
                    </Link>
                    <Link
                        style={{ fontSize: "13px", color: "#9a8888" }}
                        to="/products"
                    >
                        Product categories
                    </Link>
                </Breadcrumbs>
                <h4>Update Product Category</h4>
                <form onSubmit={Submit}>
                <div className="row">
                        <div className="col-6">
                            <label>Name</label>

                            <input
                                required
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-6">
                            <label>Price</label>

                            <input
                                required
                                type="number"
                                placeholder="Price"
                                value={price}
                                step={0.01}
                                min={1}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Category</label>
                            <select value={category_id} required onChange={(e) => setCategoryId(e.target.value)}>
                                <option disabled>Select Category</option>
                                {categories.length ? categories.map((cat) => <option value={cat.id}>{cat.name}</option>) : null}
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Stock</label>
                            <input
                                required
                                type="number"
                                placeholder="Stock"
                                value={stock}
                                min={1}
                                onChange={(e) => {
                                    setStock(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label>Description</label>

                            <input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="mt-4"
                        style={{
                            borderRadius: "0",
                            backgroundColor: "#1caf9a",
                            border: "none",
                            fontWeight: "200",
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}
const mapStateToProps = (state) => ({
    token: state.user.currentUser,
});
export default connect(mapStateToProps)(Edit)
