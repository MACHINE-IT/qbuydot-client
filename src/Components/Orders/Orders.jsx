import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, message, Spin, InputNumber } from "antd";
import './Orders.css';
import Header from '../Header/Header';
import useTheme from '../../contexts/theme';
import { config } from '../../App';
import moment from 'moment';
import Footer from '../Footer/Footer';

const Orders = () => {
    const { themeMode } = useTheme();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOrders();
    }, []);

    const logout = () => {
        for (const key in localStorage) {
            if (key !== 'themeMode') {
                localStorage.removeItem(key);
            }
        }

        navigate('/login');
    }

    const validateResponse = (errored, response) => {
        if (errored) {
            message.error(
                "Could not update orders."
            );
            return false;
        } else if (response.message) {
            if (response.code == '401') {
                message.error(`Your session is Expired. Please login again!`);
                logout();
            }
            message.error(response.message);
            return false;
        }

        return true;
    };


    const getOrders = async () => {
        let response = {};
        let errored = false;

        setLoading(true);

        try {
            response = await (
                await fetch(`${config.endpoint}/orders`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
            ).json();
        } catch (e) {
            errored = true;
        }

        setLoading(false);

        if (validateResponse(errored, response)) {
            setItems(response);
            return response;
        }
    };
    return (
        <>
            <Header />
            <div className={`order flex-container user-orders-outer-box ${themeMode}`}>
                Your Orders
                {/* Display a card view for each product in the order */}
                {!loading ? (items.map((outerItem) => (

                    <div className="order-outer-box" key={outerItem._id}> {/* Assuming outerItem has a unique id */}
                        <div className="order-created-at">
                            <strong style={{ color: '#00a278' }}>Order Placed</strong>
                            <div>
                                {moment(outerItem.createdAt).utc().add(5.5, 'hours').format('ddd, DD MMM hh:mm A')}
                            </div>
                        </div>
                        <div className="orders-parent-box">
                            {outerItem.orderItems.map((item) => (
                                <Card className="order-item" key={item.productId}>
                                    {/* Display product image */}
                                    {console.log(`item is:`, item)}
                                    <img
                                        className="order-item-image"
                                        alt={item.product.name}
                                        src={item.product.image}
                                    />
                                    {/* Display product details*/}
                                    <div className={`order-parent ${themeMode}`}>
                                        {/* Display product name, category and total cost */}
                                        <div className={`order-item-info`}>
                                            <div>
                                                <div className='order-item-name'>{item.product.name}</div>
                                                <div className="order-item-category">
                                                    ({item.product.category})
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-item-qty">
                                            <div>
                                                Quantity:
                                            </div>
                                            <div>
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="order-item-cost">
                                            <div>
                                                Total Item Price:
                                            </div>
                                            <div className='order-item-cost-margin'>
                                                ₹{item.product.cost * item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                        </div>
                    </div>
                ))) : (
                    <div className={`loading-overlay ${themeMode}`}>
                        <Spin size="large" />
                    </div>

                )}
            </div>
            <Footer />
        </>
    )
}

export default Orders