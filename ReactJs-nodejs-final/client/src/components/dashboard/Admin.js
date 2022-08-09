import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useParams
} from "react-router-dom";
import Menu from "../home/Menu";
import "../dashboard/css/Admin.css";
import { Context } from '../../contexts/Context';
function Admin() {

    const [data, setData] = useState([]);
    const [tongtrang, setTongtrang] = useState(0);
    const { categories } = useContext(Context);

    let { numberpage } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            await axios("/admin/products/" + numberpage)
                .then(result => {
                    console.log(result);
                    setData(result.data);
                },
                    (error) => {
                        console.log(error);
                    }
                )
        };
        fetchData();

        /*tonguser*/

        fetch("/countproducts")
            .then(res => res.json())
            .then(
                (result) => {

                    setTongtrang(Math.ceil(result[0].total / 10));

                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])


    function Pagination() {
        console.log(tongtrang);
        var items = []

        for (var i = 1; i <= tongtrang; i++) {
            items.push(
                <li key={i} className="page-item"><a className="page-link" href={'/admin/products/' + i}>{i}</a></li>

            );
        }
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {items}
                </ul>
            </nav>
        )

    }


    function DeleteProduct(id, e) {
        console.log(id)

        if (window.confirm("Bạn có muốn xóa?")) {
            fetch("/api/product/" + id)
                .then(res => res.json())
                .then(
                    (result) => {
                        window.location.reload(true);
                    },
                    (error) => {
                        console.log("error", error);
                    }
                )
        }

    }

    return (
        <div id="wrapper">
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div class="sidebar-brand-icon rotate-n-15">
                        <i class="fas fa-laugh-wink"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>
                <hr class="sidebar-divider my-0" />
                <li class="nav-item active">
                    <a class="nav-link" href="index.html">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>
                <hr class="sidebar-divider" />
                <div class="sidebar-heading">
                    Interface
                </div>
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>Components</span>
                    </a>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Custom Components:</h6>
                            <a class="collapse-item" href="buttons.html">Buttons</a>
                            <a class="collapse-item" href="cards.html">Cards</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-fw fa-wrench"></i>
                        <span>Utilities</span>
                    </a>
                    <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Custom Utilities:</h6>
                            <a class="collapse-item" href="utilities-color.html">Colors</a>
                            <a class="collapse-item" href="utilities-border.html">Borders</a>
                            <a class="collapse-item" href="utilities-animation.html">Animations</a>
                            <a class="collapse-item" href="utilities-other.html">Other</a>
                        </div>
                    </div>
                </li>
                <hr class="sidebar-divider" />
                <div class="sidebar-heading">
                    Addons
                </div>
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                        aria-expanded="true" aria-controls="collapsePages">
                        <i class="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Login Screens:</h6>
                            <a class="collapse-item" href="login.html">Login</a>
                            <a class="collapse-item" href="register.html">Register</a>
                            <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div class="collapse-divider"></div>
                            <h6 class="collapse-header">Other Pages:</h6>
                            <a class="collapse-item" href="404.html">404 Page</a>
                            <a class="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="charts.html">
                        <i class="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="tables.html">
                        <i class="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li>
                <hr class="sidebar-divider d-none d-md-block" />
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
                <div class="sidebar-card d-none d-lg-flex">
                    <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                    <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                    <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
                </div>

            </ul>
        </div>

        /* <div>
            <Menu />
            <div className="btnAdd">
                <Link to={'/api/product'}><button className="btn btn-primary">Thêm</button></Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Thao tác</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>
                                    <img
                                        src={item.image}
                                        style={{ width: "100px", height: "100px" }}
                                    ></img>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                {categories.map((cate) => {
                                    if (cate.id === item.idcategory) {
                                        return (
                                            <td key={item.id}>{cate.name} </td>
                                        )
                                    }

                                })}

                                <td className="description">{item.description}</td>
                                <td>
                                    <button className="button-one">
                                        <Link to={`/api/product/${item.id}`}>
                                            <i className="ic1 fas fa-edit">edit</i> </Link>
                                    </button>
                                    <button className="button-one" onClick={(e) => DeleteProduct(item.id)}>
                                        <span>
                                            <i className="ic1 far fa-trash-alt"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            <Pagination />
        </div> */
    );
}

export default Admin;