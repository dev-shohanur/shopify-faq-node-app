import { useState } from "react";
import useFetch from "./useFetch";




const useDataFetcher = (method, url, body) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const fetch = useFetch();

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  const fetchData = async () => {
    const newOptions = body === "" ? { ...options, method } : { ...options, method, body: JSON.stringify(body) };
    setIsLoading(true)
    setData("loading...");

    const result = await (await fetch(url, newOptions)).json();
    setData(result);
    setIsLoading(false);
  };

  return [data, fetchData, isLoading];
};

export default useDataFetcher;