import axios from 'axios';
import apiList from './list';

export const getAllUsers = async () => {
  return apiCall(apiList.getAllUsers);
};

export const getUsersByName = async params => {
  const urlToSend = apiList.getUsersByName;
  return apiCall(urlToSend.replace(':string', params.search));
};

export const getUserData = async params => {
  const urlToSend = apiList.getUserData;
  return apiCall(urlToSend.replace(':name', params.name));
};

export const getReposByUser = async params => {
  const urlToSend = apiList.getReposByUser;
  return apiCall(urlToSend.replace(':username', params.username));
};

export const getSubsByUser = async params => {
  const urlToSend = apiList.getSubsByUser;
  return apiCall(urlToSend.replace(':username', params.username));
};

const apiCall = async url => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    return {error: true};
  }
};
