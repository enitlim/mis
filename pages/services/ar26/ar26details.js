import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export async function getAr26IndividualRecord(id){
    try {
        const response= await axios.get(`${API_URL}/ar26/${id}`)
        return response.data;
    } catch (error) {
         throw new Error(
           error.response?.data?.message || "Error"
         );
    }
}

export async function patchAr26IndividualRecord(id, data) {
  try {
    const response = await axios.patch(`${API_URL}/ar26/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error");
  }
}
