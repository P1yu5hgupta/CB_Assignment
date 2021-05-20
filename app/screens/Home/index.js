import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Linking,
} from 'react-native';

import useHome from './useHome';

const HomeScreen = ({navigation}) => {
  const {users, isError, isApiLoading, searchName, changeInputHandler} =
    useHome(navigation);

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
      <View style={styles.container}>
        <Text style={styles.noUserText}>No User Found</Text>
      </View>
    );
  };

  return isApiLoading ? (
    <ActivityIndicator size="large" color="black" style={styles.container} />
  ) : isError ? (
    <View style={styles.errorContainer}>
      <Text>Error while loading.... Try again....</Text>
    </View>
  ) : (
    <View style={styles.container}>
      {renderHeader()}
      <TextInput
        placeholder="Search By Name"
        value={searchName}
        onChangeText={changeInputHandler}
        style={styles.searchBox}
      />
      <FlatList
        data={users}
        renderItem={renderListItems}
        ListEmptyComponent={renderEmptyIndicator}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderSeperatorLine}
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
  searchBox: {
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
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
  noUserText: {
    alignSelf: 'center',
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default HomeScreen;
