import {useState, useEffect} from 'react';
import {getAllUsers, getUsersByName} from '../../apiCall';

function useHome() {
  const [users, setUsers] = useState([]);
  const [isError, setError] = useState(false);
  const [isApiLoading, setApiLoading] = useState(true);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    if (searchName.length === 0) {
      getAllUsersApi();
    } else {
      getUsersByNameApi();
    }
  }, [searchName]);

  const getAllUsersApi = async () => {
    const data = await getAllUsers();
    if (data.error) {
      setError(true);
    } else {
      setUsers(data);
      setApiLoading(false);
    }
  };

  const getUsersByNameApi = async () => {
    const data = await getUsersByName({search: searchName});
    if (data.error) {
      setError(true);
    } else {
      setUsers(data.items);
      setApiLoading(false);
    }
  };

  const changeInputHandler = name => {
    setSearchName(name);
  };

  return {
    users,
    isError,
    isApiLoading,
    searchName,
    changeInputHandler,
  };
}

export default useHome;
