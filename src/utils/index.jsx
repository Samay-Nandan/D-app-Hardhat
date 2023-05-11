export const shortenAddress = (address) =>
  `${address?.slice(0, 5)}...${address?.slice(address.length - 4)}`;

export const formatDate = (timestamp) => {
  const requiredDate = +timestamp.toString().replaceAll("n", "");
  const options = {
    dateStyle: "medium",
    timeStyle: "short",
    hour12: true,
  };
  return new Date(requiredDate * 1000).toLocaleString("en-US", options);
};
