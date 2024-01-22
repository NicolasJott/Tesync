import axios from "axios";

const audience = "https://fleet-api.prd.na.vn.cloud.tesla.com";

export const getVehicles = async () => {
  console.log(axios.defaults.headers.common["Authorization"]);
  try {
    const response = await axios.get(`${audience}/api/1/vehicles`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
