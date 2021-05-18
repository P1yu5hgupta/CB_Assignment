import axios from 'axios';
import apiList from './list';

export const getAllUsers = async () => {
  return apiCall(apiList.getAllUsers);
};

export const getUserData = async params => {
  const urlToSend = apiList.getUserData;
  return apiCall(urlToSend.replace(':name', params.name));
};

const apiCall = async url => {
  const response = await axios.get(url);
  return response.data;
};
