export const loginUser = async (data) => {
  try {
    const res = await api.post(endPoint.LOGIN, data);
    return res.data;
    console.log("Login Response:", res.data);   
  } catch (error) {
    throw error;
  }
};
