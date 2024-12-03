export const fetchData = async (url: string, options?: RequestInit) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  };
  