export const submitDoor = (door, doorListingId) => {
  return $.ajax({
    method: "POST",
    url: `/api/door_listings/${doorListingId}/doors`,
    data: { door },
  });
};

export const fetchDoors = (doorListingId) => {
  return $.ajax({
    method: "GET",
    url: `/api/door_listings/${doorListingId}/doors`,
  });
};

export const fetchDoor = (doorId) => {
  return $.ajax({
    method: "GET",
    url: `/api/doors/${doorId}`,
  });
};
