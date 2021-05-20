import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';

import {getAllUsers} from '../../apiCall';

const HomeScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    getAllUsersApi();
  }, []);

  const getAllUsersApi = async () => {
    const data = await getAllUsers();
    if (data.error) {
      setError(true);
    } else {
      setUsers(data);
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Github Users</Text>
      </View>
    );
  };

  const renderSeperatorLine = () => {
    return <View style={styles.baseline} />;
  };

  const renderListItems = ({item}) => {
    return (
      <View style={styles.listItem}>
        <Image source={{uri: item.avatar_url}} style={styles.image} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.login}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(item.html_url)}>
            <Text style={styles.link}>View On Github</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile', {name: item.login})}
          style={styles.button}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyIndicator = () => {
    return (
      <ActivityIndicator size="large" color="black" style={styles.container} />
    );
  };

  return isError ? (
    <View style={styles.errorContainer}>
      <Text>Error while loading.... Try again....</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderListItems}
        ListEmptyComponent={renderEmptyIndicator}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeperatorLine}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    padding: 5,
  },
  baseline: {
    backgroundColor: 'black',
    height: 1,
    marginLeft: 40,
  },
  image: {
    flex: 1,
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  userInfo: {
    flex: 9,
    flexDirection: 'column',
    marginLeft: 10,
  },
  userName: {
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
  link: {
    color: '#42C3EE',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 30,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});
export default HomeScreen;
