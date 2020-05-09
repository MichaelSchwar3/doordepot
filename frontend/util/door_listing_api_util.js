export const submitDoorListing = doorListing => {
  return $.ajax({
    method: "POST",
    url: "/api/door_listings",
    data: { doorListing }
  });
};

export const fetchDoorListings = () => {
  return $.ajax({
    method: "GET",
    url: "/api/door_listings"
  });
};

export const fetchDoorListing = doorListingId => {
  return $.ajax({
    method: "GET",
    url: `/api/doorListings/${doorListingId}`
  });
};
