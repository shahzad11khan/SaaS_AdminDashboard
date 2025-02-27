import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { socket } = useSelector(state => state.socket);
  const [orders, setOrders] = useState([]); // Store incoming orders

  useEffect(() => {
    if (!socket) return;

    console.log("Listening for new orders...");

    // Listen for new orders
    socket.on("newOrder", (order) => {
      console.log("📦 New order received:", order);
      setOrders(prevOrders => [...prevOrders, order]); // Update state with new order
    });

    // Cleanup listener when component unmounts
    return () => {
      socket.off("newOrder");
    };
  }, [socket]);

  return (
    <div>
      <h2>New Orders</h2>
      {orders.length === 0 ? <p>No new orders</p> : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              Order ID: {order._id} - Total: ${order.totalAmount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
