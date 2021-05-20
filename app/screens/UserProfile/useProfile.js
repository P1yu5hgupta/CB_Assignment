import {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';

import {getUserData, getReposByUser, getSubsByUser} from '../../apiCall';

function useProfile(route) {
  const name = route.params ? route.params.name : null;
  const layout = useWindowDimensions();

  const [userData, setUserData] = useState({});
  const [isError, setError] = useState(false);
  const [isApiLoading, setApiLoading] = useState(true);
  const [isUserDetailsLoading, setUserDetailsLoading] = useState(true);
  const [repoList, setRepoList] = useState([]);
  const [subsList, setSubsList] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'repo', title: 'Repositories'},
    {key: 'subs', title: 'Subscriptions'},
  ]);

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
      getUserDetailsApi();
    }
  };

  const getUserDetailsApi = async () => {
    await Promise.all([getReposByUserApi(), getSubsByUserApi()]);
    setUserDetailsLoading(false);
  };

  const getReposByUserApi = async () => {
    const data = await getReposByUser({username: name});
    setRepoList(data);
  };

  const getSubsByUserApi = async () => {
    const data = await getSubsByUser({username: name});
    setSubsList(data);
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
    layout,
    index,
    setIndex,
    routes,
    repoList,
    subsList,
    refreshHandler,
    isUserDetailsLoading,
  };
}

export default useProfile;
