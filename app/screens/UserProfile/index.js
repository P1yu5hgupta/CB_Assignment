import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from 'react-native';

import useProfile from './useProfile';

const UserProfileScreen = ({route, navigation}) => {
  const {userData, isError, isApiLoading, refreshHandler} = useProfile(route);

  return isApiLoading ? (
    <ActivityIndicator size="large" color="black" style={styles.container} />
  ) : isError ? (
    <View style={styles.errorContainer}>
      <Text>Error!!</Text>
      <TouchableOpacity onPress={refreshHandler} style={styles.refreshButton}>
        <Text style={styles.refreshText}> Try Again </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={{uri: userData.avatar_url}} style={styles.image} />
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{userData.login}</Text>
          <Text>{userData.name}</Text>
        </View>
      </View>
      <View style={styles.folView}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.number}>{userData.followers}</Text>
          <Text style={styles.folText}>Followers</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.number}>{userData.following}</Text>
          <Text style={styles.folText}>Following</Text>
        </View>
      </View>
      <Text style={styles.aboutText}>About</Text>
      {userData.bio ? <Text>{userData.bio}</Text> : <Text>Github User</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(userData.html_url)}>
        <Text style={styles.buttonText}>View User On Github</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go to HomePage</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 80,
  },
  userNameContainer: {
    padding: 10,
    alignSelf: 'center',
  },
  userName: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  folView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
  },
  number: {
    fontSize: 16,
  },
  folText: {
    fontSize: 18,
    color: 'gray',
  },
  aboutText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 30,
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  refreshButton: {
    borderRadius: 4,
    backgroundColor: 'black',
    padding: 8,
  },
  refreshText: {
    color: 'white',
  },
});
export default UserProfileScreen;
