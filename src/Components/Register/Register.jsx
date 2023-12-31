import { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { config } from "../../App";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    /**
  * Validate the input values so that any bad or illegal values are not passed to the backend.
  *
  * @returns {boolean}
  *    Whether validation has passed or not
  *
  * Return false if any validation condition fails, otherwise return true.
  * -    Check that username field is not an empty value
  * -    Check that username field is not less than 6 characters in length
  * -    Check that username field is not more than 32 characters in length
  * -    Check that password field is not an empty value
  * -    Check that password field is not less than 6 characters in length
  * -    Check that password field is not more than 32 characters in length
  * -    Check that confirmPassword field has the same value as password field
  */

    const validateInput = () => {
        if (!username) {
            message.error("Username is a required field");
            return false;
        }
        if (username.length < 6) {
            message.error("Username must be at least 6 characters");
            return false;
        }
        if (username.length > 32) {
            message.error("Username must be at most 32 characters");
            return false;
        }
        if (!password) {
            message.error("Password is a required field");
            return false;
        }
        if (password.length < 6) {
            message.error("Password must be at least 8 characters");
            return false;
        }
        if (password.length > 32) {
            message.error("Password must be at most 32 characters");
            return false;
        }
        if (password !== confirmPassword) {
            message.error("Passwords do not match");
            return false;
        }

        return true;
    };

    /**
       * Check the response of the API call to be valid and handle any failures along the way
       *
       * @param {boolean}  errored
       *    Represents whether an error occurred in the process of making the API call itself
       * @param {{ success: boolean, message?: string }}  response
       *    The response JSON object which may contain further success or error messages
       * @returns {boolean}
       *    Whether validation has passed or not
       *
       * If the API call itself encounters an error, errored flag will be true.
       * If the backend returns an error, then success field will be false and message field will have a string with error details to be displayed.
       * When there is an error in the API call itself, display a generic error message and return false.
       * When there is an error returned by backend, display the given message field and return false.
       * When there is no error and API call is successful, return true.
       */

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
   * @returns {{ success: boolean }|undefined}
   *     The response JSON object
   *
   * -    Set the loading state variable to true
   * -    Perform the API call via a fetch call: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * -    The call must be made asynchronously using Promises or async/await
   * -    The call must handle any errors thrown from the fetch call
   * -    Parse the result as JSON
   * -    Set the loading state variable to false once the call has completed
   * -    Call the validateResponse(errored, response) function defined previously
   * -    If response passes validation, return the response object
   **/

    const performAPICall = async () => {
        let response = {};
        let errored = false;
        setLoading(true);

        try {
            response = await (
                await fetch(`${config.endpoint}/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: username,
                        email: email,
                        password: password,
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
   * Definition for register handler
   * This is the function that is called when the user clicks on the register button or submits the register form
   * -    Call the previously defined validateInput() function and check that is returns true, i.e. the input values pass validation
   * -    Call the previously defined performAPICall() function asynchronously and capture the returned value in a variable
   * -    If the returned value exists,
   *      -   Clear the input fields
   *      -   Display a success message
   *      -   Redirect the user to the "/login" page
   */

    const register = async () => {
        if (validateInput()) {
            const response = await performAPICall();
            if (response) {
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                message.success("Registered successfully");
                navigate("/login");
            }
        }
    };

    return (
        <>
            {/* Display Header */}
            <Header history={history} />

            {/* Display Register fields */}
            <div className="flex-container">
                <div className="register-container container">
                    <h1>Register your account</h1>

                    {/* Antd component which renders a formatted <input type="text"> field */}
                    <Input
                        className="input-field"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        className="input-field"
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Antd component which renders a formatted <input type="password"> field */}
                    <Input.Password
                        className="input-field"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Antd component which renders a formatted <input type="password"> field */}
                    <Input.Password
                        className="input-field"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {/* Antd component which renders a formatted <button type="button"> field */}
                    <Button loading={loading} type="primary" onClick={register}>
                        Register
                    </Button>
                </div>
            </div>

            {/* Display the footer */}
            <Footer />
        </>
    );
};

export default Register;
