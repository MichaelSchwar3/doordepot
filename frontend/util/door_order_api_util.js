export const submitDoorOrder = order => {
  return $.ajax({
    method: "POST",
    url: "/api/door_orders",
    data: { order }
  });
};

export const fetchDoorOrderOptions = () => {
  return $.ajax({
    method: "GET",
    url: "/api/forms/door"
  });
};

