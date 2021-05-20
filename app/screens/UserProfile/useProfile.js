import {useEffect, useState} from 'react';

import {getUserData} from '../../apiCall';

function useProfile(route, navigation) {
  const name = route.params ? route.params.name : null;

  const [userData, setUserData] = useState({});
  const [isError, setError] = useState(false);

  useEffect(() => {
    getUserDataApi();
  }, []);

  const getUserDataApi = async () => {
    const data = await getUserData({name: name});
    if (data.error) {
      setError(true);
    } else {
      setUserData(data);
    }
  };

  return {
    userData,
    isError,
  };
}

export default useProfile;
