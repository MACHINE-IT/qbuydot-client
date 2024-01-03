import { Button, message, Radio, Row, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { config } from "../../App";
import Cart from "../Cart/Cart";
import "./Checkout.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import useTheme from "../../contexts/theme";

const Checkout = () => {
    const cartRef = useRef(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [address, setAddress] = useState("");
    // const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const [newAddress, setNewAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const { themeMode } = useTheme();

    const validateGetProductsResponse = (errored, response) => {
        if (errored || (!response.length && !response.message)) {
            message.error(
                "Could not fetch products. Check that the backend is running, reachable and returns valid JSON."
            );
            return false;
        }

        if (!response.length) {
            message.error(response.message || "No products found in the database");
            return false;
        }

        return true;
    };

    const getProducts = async () => {
        let response = {};
        let errored = false;

        setLoading(true);

        try {
            response = await (await fetch(`${config.endpoint}/products`)).json();
        } catch (e) {
            errored = true;
        }

        setLoading(false);

        if (validateGetProductsResponse(errored, response)) {
            if (response) {
                setProducts(response);
            }
        }
    };

    const validateResponse = (errored, response, couldNot) => {
        if (errored) {
            message.error(
                `Could not ${couldNot}. Check that the backend is running, reachable and returns valid JSON.`
            );
            return false;
        }
        if (response.message) {
            message.error(response.message);
            return false;
        }
        return true;
    };

    const getAddresses = async () => {
        let response = {};
        let errored = false;

        setLoading(true);

        try {
            response = await (
                await fetch(
                    `${config.endpoint}/users/${localStorage.getItem(
                        "userId"
                    )}?q=address`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
            ).json();
        } catch (e) {
            errored = true;
        }

        setLoading(false);

        if (validateResponse(errored, response, "fetch addresses")) {
            if (response) {
                setAddress(
                    response.address !== "ADDRESS_NOT_SET" ? response.address : ""
                );
            }
        }
    };

    const addAddress = async () => {
        let response = {};
        let errored = false;

        setLoading(true);

        try {
            response = await (
                await fetch(
                    `${config.endpoint}/users/${localStorage.getItem(
                        "userId"
                    )}?q=address`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            address: newAddress,
                        }),
                    }
                )
            ).json();
        } catch (e) {
            errored = true;
        }

        setLoading(false);

        if (validateResponse(errored, response, "add a new address")) {
            if (response) {
                message.success("Address added");

                setNewAddress("");

                await getAddresses();
            }
        }
    };

    // const deleteAddress = async (addressId) => {
    //     let response = {};
    //     let errored = false;

    //     setLoading(true);

    //     try {
    //         response = await (
    //             await fetch(`${config.endpoint}/user/addresses/${addressId}`, {
    //                 method: "DELETE",
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                 },
    //             })
    //         ).json();
    //     } catch (e) {
    //         errored = true;
    //     }

    //     setLoading(false);

    //     if (validateResponse(errored, response, "delete address")) {
    //         if (response) {
    //             message.success("Address deleted");

    //             await getAddresses();
    //         }
    //     }
    // };

    const checkout = async () => {
        let response = {};
        let errored = false;

        setLoading(true);

        try {
            response = await fetch(`${config.endpoint}/cart/checkout`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
        } catch (e) {
            errored = true;
            console.log(e);
        }

        setLoading(false);

        let data;
        if (response.status !== 204) {
            data = await response.json();
        }
        if (response.status === 204 || validateResponse(errored, data)) {
            message.success("Order placed");

            console.log(cartRef.current.calculateTotal());
            localStorage.setItem(
                "balance",
                parseInt(localStorage.getItem("balance")) -
                cartRef.current.calculateTotal()
            );

            navigate("/thanks");
        }
    };

    const order = () => {
        checkout();
    };

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("username") && localStorage.getItem("token")) {
                await getProducts();
                await getAddresses();

                setBalance(localStorage.getItem("balance"));
            } else {
                message.error(
                    "You must be logged in to visit the checkout page"
                );
                navigate("/");
            }
        };

        fetchData();
    }, [history]);

    const radioStyle = {
        display: "block",
        height: "30px",
        lineHeight: "30px",
    };

    return (
        <>
            {/* Display Header */}
            <Header history={history} />

            {/* Display Checkout page content */}
            <div className={`checkout-container`}>
                <Row>
                    {/* Display checkout instructions */}
                    <Col xs={{ span: 24, order: 2 }} md={{ span: 18, order: 1 }}>
                        <div className="checkout-shipping">
                            <h1 style={{ marginBottom: "-5px" }}>Shipping</h1>

                            <hr></hr>
                            <br></br>

                            <p>Shipping Address</p>

                            {/* Display the "Shipping" sectino */}
                            <div className="address-section">
                                {address.length ? (
                                    <div className="address-box">
                                        {/* Display address title */}
                                        <div className="address-text">{address}</div>
                                    </div>
                                ) : (
                                    // Display static text banner if no addresses are added
                                    <div className="red-text checkout-row">
                                        No addresses found. Please add one to proceed.
                                    </div>
                                )}

                                <div className="checkout-row">
                                    {/* Text input field to type a new address */}
                                    <div>
                                        <TextArea
                                            className="new-address"
                                            placeholder={
                                                address
                                                    ? "Update Address"
                                                    : "Add new address"
                                            }
                                            rows={4}
                                            value={newAddress}
                                            onChange={(e) => {
                                                setNewAddress(e.target.value);
                                            }}
                                        />
                                    </div>

                                    {/* Button to submit address added */}
                                    <div>
                                        <Button type="primary" onClick={addAddress}>
                                            {address
                                                ? "Update Address"
                                                : "Add new address"}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            {/* Display the "Pricing" section */}
                            <div>
                                <h1 style={{ marginBottom: "-5px" }}>Pricing</h1>

                                <hr></hr>

                                <h2>Payment Method</h2>

                                <Radio.Group value={1}>
                                    <Radio className={`availableBalance ${themeMode}`} style={radioStyle} value={1}>
                                        Wallet
                                        <strong> (₹{balance} available)</strong>
                                    </Radio>
                                </Radio.Group>
                            </div>

                            <br></br>

                            {/* Button to confirm order */}
                            <Button
                                className="ant-btn-success"
                                loading={loading}
                                type="primary"
                                onClick={order}
                            >
                                <strong>Place Order</strong>
                            </Button>
                        </div>
                    </Col>

                    {/* Display the cart */}
                    <Col
                        xs={{ span: 24, order: 1 }}
                        md={{ span: 6, order: 2 }}
                        className="checkout-cart"
                    >
                        <div>
                            {products.length && (
                                <Cart
                                    ref={cartRef}
                                    products={products}
                                    history={history}
                                    token={localStorage.getItem("token")}
                                    checkout={true}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Display the footer */}
            <Footer />
        </>
    );
};

export default Checkout;
