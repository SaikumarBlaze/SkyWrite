const keepBackendAlive = (url) => {
  // Set interval to ping the backend every 5 minutes
  const intervalId = setInterval(async () => {
    try {
      const response = await fetch(`${url}/api/auth/ping`);
      if (response.ok) {
        console.log("Pinged backend successfully");
      }
    } catch (error) {
      console.error("Error pinging backend:", error);
    }
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
  return intervalId;
};

export default keepBackendAlive;
