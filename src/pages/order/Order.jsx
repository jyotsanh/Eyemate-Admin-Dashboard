import React, { useEffect, useState } from 'react';
import { getUserOrder } from '../../service/api';
import './order.css';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

function isTokenExpired(token) {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true; // If there's an error decoding, assume the token is invalid
    }
}

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const ordersPerPage = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    setError('Please Log-In');
                    return;
                } else if (isTokenExpired(token)) {
                    setError('Session expired. Please Log-In again.');
                    return;
                } else {
                    const decoded = jwtDecode(token);
                    if (decoded.role === 'admin') {
                        setError('Admin is not supposed to see this page');
                        return;
                    }
                }
                const response = await getUserOrder(token);
                if (response.data.Order && response.data.Order.length > 0) {
                    setOrders(response.data.Order);
                } else {
                    setError('You have no orders yet.');
                }
            } catch (error) {
                setError('Failed to fetch orders. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const displayedOrders = orders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="admin-container">{error}</div>;
    }

    return (
        <div className="order-container">
            <h2>Your Orders</h2>
            {displayedOrders.map((order, index) => (
                <div key={index} className="order-info">
                    <h3>Order Details</h3>
                    <p>Order Placed: {new Date(order.created_at).toLocaleString()}</p>
                    <p>Your Phone Number: {order.phone_number}</p>
                    <p>Shipping Address: {`${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state}, ${order.shipping_address.zip}`}</p>
                    <p>Payment Method: {order.payment_method}</p>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products.map(product => (
                                <tr key={product._id}>
                                    <td>{product.product_id}</td>
                                    <td>{product.quantity}</td>
                                    <td>Rs.{product.price}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="total-price">Total Price: Rs.{order.total_price}</p>
                </div>
            ))}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(orders.length / ordersPerPage)}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Order;
