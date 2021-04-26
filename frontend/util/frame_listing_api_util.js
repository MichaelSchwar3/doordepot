export const submitFrameListing = frameListing => {
  return $.ajax({
    method: "POST",
    url: "/api/frame_listings",
    data: { frameListing }
  });
};

export const fetchFrameListings = () => {
  return $.ajax({
    method: "GET",
    url: "/api/frame_listings"
  });
};

export const fetchFrameListing = frameListingId => {
  return $.ajax({
    method: "GET",
    url: `/api/frameListings/${frameListingId}`
  });
};
