import { useState, useEffect } from "react";

const API_URL = "https://api.exchangerate-api.com/v4/latest/KES";

const useCurrencyConverter = (amount, targetCurrency) => {
  const [exchangeRates, setExchangeRates] = useState({ KES: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates from API.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update rates every 1 minute
    return () => clearInterval(interval);
  }, []);

  const convert = (amount, currency) => {
    if (loading) return "Loading...";
    return (amount * (exchangeRates[currency] || 1)).toFixed(2);
  };

  return convert(amount, targetCurrency);
};

export default useCurrencyConverter;
