export async function fetchAccountData(token) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/account`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch account data.");
    }

    const data = await response.json();
    console.log("Response Data:", data);

    return data;
  } catch (error) {
    console.error("Error during fetching account data:", error);
    throw error;
  }
}
