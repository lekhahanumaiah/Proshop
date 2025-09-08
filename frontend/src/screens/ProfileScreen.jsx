// // // src/screens/ProfileScreen.js
// // import React, { useState, useEffect } from "react";
// // import { useSelector } from "react-redux";
// // import { useProfileMutation } from "../slices/usersApiSlice";
// // import Loader from "../components/Loader";
// // import Message from "../components/Message";
// // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// // const ProfileScreen = ({ history }) => {
// //   const { userInfo } = useSelector((state) => state.auth);

// //   const [name, setName] = useState(userInfo?.name || "");
// //   const [email, setEmail] = useState(userInfo?.email || "");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [message, setMessage] = useState(null);

// //   const [updateProfile, { isLoading, error, isSuccess }] = useProfileMutation();

// //   useEffect(() => {
// //     if (!userInfo) {
// //       history.push("/login");
// //     }
// //   }, [userInfo, history]);

// //   const submitHandler = async (e) => {
// //     e.preventDefault();

// //     if (password !== confirmPassword) {
// //       setMessage("Passwords do not match");
// //       return;
// //     }

// //     try {
// //       await updateProfile({
// //         id: userInfo._id,
// //         name,
// //         email,
// //         password,
// //       }).unwrap();

// //       setMessage("Profile updated successfully ✅");
// //     } catch (err) {
// //       setMessage(err?.data?.message || "Error updating profile");
// //     }
// //   };

// //   // PayPal Client ID (use sandbox for testing)
// //   const paypalClientId = "YOUR_SANDBOX_CLIENT_ID";

// //   return (
// //     <div className="profile-screen">
// //       <div className="profile-form">
// //         <h2>User Profile</h2>

// //         {message && <Message variant="danger">{message}</Message>}
// //         {error && <Message variant="danger">{error?.data?.message}</Message>}
// //         {isSuccess && <Message variant="success">Profile Updated</Message>}
// //         {isLoading && <Loader />}

// //         <form onSubmit={submitHandler}>
// //           <div>
// //             <label>Name</label>
// //             <input
// //               type="text"
// //               placeholder="Enter name"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <label>Email Address</label>
// //             <input
// //               type="email"
// //               placeholder="Enter email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <label>Password</label>
// //             <input
// //               type="password"
// //               placeholder="Enter password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //             />
// //           </div>

// //           <div>
// //             <label>Confirm Password</label>
// //             <input
// //               type="password"
// //               placeholder="Confirm password"
// //               value={confirmPassword}
// //               onChange={(e) => setConfirmPassword(e.target.value)}
// //             />
// //           </div>

// //           <button type="submit" disabled={isLoading}>
// //             {isLoading ? "Updating..." : "Update"}
// //           </button>
// //         </form>
// //       </div>

// //       <div className="profile-paypal">
// //         <h2>Make a Payment</h2>
// //         <PayPalScriptProvider
// //           options={{
// //             "client-id": paypalClientId,
// //             currency: "USD",
// //             components: "buttons",
// //             intent: "capture",
// //             "enable-funding": "paylater",
// //           }}
// //         >
// //           <PayPalButtons
// //             style={{ layout: "vertical", color: "gold", label: "paypal" }}
// //             onApprove={(data, actions) => {
// //               return actions.order.capture().then(function (details) {
// //                 alert("Transaction completed by " + details.payer.name.given_name);
// //               });
// //             }}
// //           />
// //         </PayPalScriptProvider>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileScreen;
// // src/screens/ProfileScreen.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import { FaTimes } from "react-icons/fa";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [updateProfile, { isLoading, isSuccess, error }] = useProfileMutation();

  // ✅ Fetch logged-in user orders
  const { data: orders, isLoading: loadingOrders, error: ordersError } =
    useGetMyOrdersQuery();

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login"; // redirect if not logged in
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await updateProfile({
        id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();

      setMessage("Profile updated successfully ✅");
    } catch (err) {
      setMessage(err?.data?.message || "Error updating profile");
    }
  };

  return (
    <Row>
      {/* Left Column - Profile Form */}
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error?.data?.message}</Message>}
        {isSuccess && <Message variant="success">Profile Updated</Message>}
        {isLoading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Form>
      </Col>
       {/* Right Column - Orders */}
     
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? <Loader/>: error ? (<Message variant='danger'>
            {error?.data?.message || error.error}
            </Message>):(
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders && orders.length > 0 ? (
  orders.map((order) => (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>${order.totalPrice}</td>
      <td>
        {order.isPaid ? (
          order.paidAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        {order.isDelivered ? (
          order.deliveredAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        <LinkContainer to={`/order/${order._id}`}>
            <Button className='btn-sm' variant='light'>
            Details
            </Button>
            </LinkContainer>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5">No orders found</td>
  </tr>
)}
 </tbody>
</Table>
)}
     </Col>
    </Row>
  );
};

export default ProfileScreen;

