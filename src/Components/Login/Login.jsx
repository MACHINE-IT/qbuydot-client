import { useState } from "react";
import { Button, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { config } from "../../App";

const Login = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    /**
 * Validate the input values so that any bad or illegal values are not passed to the backend.
 *
 * @returns {boolean}
 *    Whether validation has passed or not
 *
 * Return false if any validation condition fails, otherwise return true.
 * -    Check that email field is not an empty value
 * -    Check that password field is not an empty value
 */

    /**
   * Check the response of the API call to be valid and handle any failures along the way
   *
   * @param {boolean} errored
   *    Represents whether an error occurred in the process of making the API call itself
   * @param {{ success: boolean, message?: string, token?: string, email?: string }} response
   *    The response JSON object from API call which may contain further success or error messages
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * If the API call itself encounters an error, errored flag will be true.
   * If the backend returns an error, then success field will be false and message field will have a string with error details to be displayed.
   * When there is an error in the API call itself, display a generic error message and return false.
   * When there is an error returned by backend, display the given message field and return false.
   * When there is no error and API call is successful, return true.
   */

    const validateInput = () => {
        if (!email) {
            message.error("Email is a required field");
            return false;
        }
        if (!password) {
            message.error("Password is a required field");
            return false;
        }
        return true;
    };

    const validateResponse = (errored, response) => {
        if (errored || (!response.tokens && !response.message)) {
            message.error(
                "Something went wrong."
            );
            return false;
        }
        if (!response.tokens) {
            message.error(response.message);
            return false;
        }
        return true;
    };

    /**
  * Perform the API call over the network and return the response
  *
  * @returns {{ success: boolean, token: string, email: string, balance: number }|undefined}
  *    The response JSON object
  *
  * -    Set the loading state variable to true
  * -    Perform the API call via a fetch call: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
  *      - The call must be made asynchronously using Promises or async/await
  *      - The call must handle any errors thrown from the fetch call
  *      - Parse the result as JSON
  * -    Set the loading state variable to false once the call has completed
  * -    Call the validateResponse(errored, response) function defined previously
  * -    If response passes validation, return the response object
  */

    const performAPICall = async () => {
        let response = {};
        let errored = false;
        setLoading(true);
        try {
            response = await (
                await fetch(`${config.endpoint}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                })
            ).json();
        } catch (e) {
            errored = true;
        }
        setLoading(false);
        if (validateResponse(errored, response)) {
            return response;
        }
    };

    /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} email
   *    Email of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `email` field in localStorage can be used to store the email that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   * -    `username` field in localStorage can be used to store the User's name
   * -    `userId` field in localStorage can be used to store the user ID
   */

    const persistLogin = (token, email, balance, name, userId) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("balance", balance);
        localStorage.setItem("username", name);
        localStorage.setItem("userId", userId);
    };

    /**
   * Definition for login handler
   * This is the function that is called when the user clicks on the login button or submits the login form
   * -    Call the previously defined validateInput() function and check that is returns true, i.e. the input values pass validation
   * -    Call the previously defined performAPICall() function asynchronously and capture the returned value in a variable
   * -    If the returned value exists,
   *      -   Call the previously defined persistLogin(token, email, balance,username,userId) function
   *      -   Clear the input fields
   *      -   Display a success message
   *      -   Redirect the user to the "/products" page
   */

    const login = async () => {
        const isValidInput = validateInput();
        if (isValidInput) {
            const response = await performAPICall();
            if (response) {
                persistLogin(
                    response.tokens.access.token,
                    response.user.email,
                    response.user.walletMoney,
                    response.user.name,
                    response.user._id
                );
                setEmail("");
                setPassword("");
                message.success("Logged in successfully");
                navigate("/products");
            }
        }
    };

    return (
        <>
            {/* Display Header */}
            <Header history={history} />

            {/* Display Login fields */}
            <div className="flex-container">
                <div className="login-container container">
                    <h1>Login to QKart</h1>

                    <Input
                        className="input-field"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input.Password
                        className="input-field"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button loading={loading} type="primary" onClick={login}>
                        Login
                    </Button>
                </div>
            </div>

            {/* Display the footer */}
            <Footer />
        </>
    );
};

export default Login;
