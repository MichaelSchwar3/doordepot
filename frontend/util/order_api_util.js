export const submitOrder = order => {
  return $.ajax({
    method: "POST",
    url: "/api/orders",
    data: { order }
  });
};

export const fetchOrders = () => {
  return $.ajax({
    method: "GET",
    url: "/api/orders"
  });
};

export const fetchOrder = (orderId) => {
  return $.ajax({
    method: "GET",
    url: `/api/orders/${orderId}`
  })
}
