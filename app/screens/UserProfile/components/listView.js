import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

const ListView = ({data}) => {
  const renderSeperatorLine = () => {
    return <View style={styles.baseline} />;
  };

  const renderListItems = ({item}) => {
    return (
      <View style={styles.repoInfo}>
        <Text style={styles.repoName}>{item.name}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(item.html_url)}>
          <Text style={styles.link}>{item.full_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderListItems}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={renderSeperatorLine}
    />
  );
};

const styles = StyleSheet.create({
  baseline: {
    backgroundColor: 'gray',
    height: 1,
  },
  repoInfo: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  repoName: {
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
  link: {
    color: '#42C3EE',
  },
});

export default ListView;
