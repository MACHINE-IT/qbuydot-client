/* eslint-disable react/prop-types */
import { Button } from "antd";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Thanks.css";

const Thanks = ({ history }) => {
    /**
     * The goal is to display a simple thank you page that the user will see after a successful order goes through
     * Items to display can include:
     * -    Thank you text
     * -    Remaining wallet balance
     * -    Link to go back to Products page to shop more
     * @returns {JSX} HTML and JSX to be rendered
     */
    return (
        <>
            {/* Display Header */}
            <Header history={history} />

            {/* Display order details */}
            <div className="thanks-container">
                <h1 className="thanks-order-confirm-text" style={{ fontWeight: "600" }}>It&apos;s ordered!</h1>

                <div className="green-text thanks-line">
                    You will receive an invoice for your order shortly.
                    <br />
                    Your order will arrive in 7 business days.
                </div>

                <div className="thanks-order-confirm-text thanks-line">
                    Wallet balance: <br></br>₹{localStorage.getItem("balance")}{" "}
                    available
                </div>
                <div className="orders-products-buttons">
                    <Link to="/orders">
                        <Button type="primary">Go to your orders</Button>
                    </Link>
                    <Link to="/products">
                        <Button type="primary">Browse for more products</Button>
                    </Link>
                </div>

            </div>
        </>
    );
};

export default Thanks;