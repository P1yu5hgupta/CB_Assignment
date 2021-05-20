import {useEffect, useState} from 'react';

import {getUserData} from '../../apiCall';

function useProfile(route) {
  const name = route.params ? route.params.name : null;

  const [userData, setUserData] = useState({});
  const [isError, setError] = useState(false);
  const [isApiLoading, setApiLoading] = useState(true);

  useEffect(() => {
    getUserDataApi();
  }, []);

  const getUserDataApi = async () => {
    const data = await getUserData({name: name});
    if (data.error) {
      setError(true);
    } else {
      setUserData(data);
      setApiLoading(false);
    }
  };

  const refreshHandler = () => {
    setError(false);
    setApiLoading(true);
    getUserDataApi();
  };

  return {
    userData,
    isError,
    isApiLoading,
    refreshHandler,
  };
}

export default useProfile;
