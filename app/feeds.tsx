import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../utils/supabase';
import { User } from '@supabase/supabase-js';
import moment from 'moment';

type Post = {
  id: string;
  content: string;
  created_at: string;
};

export default function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>('');
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    fetchPosts();
    supabase.auth.getUser().then((response) => {
      setUser(response.data.user);
    }).catch((error) => {
      console.log(error);
    });
    const subscription = supabase
      .channel('realtime:Posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Posts' }, (payload) => {
        setPosts((currentPosts) => [payload.new as Post, ...currentPosts]);
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchPosts = async () => {
    const result = await supabase.from('Posts').select('*').order('created_at', { ascending: false });
    const { data, error } = result;
    if (!error) setPosts(data);
  };

  const addPost = async () => {
    if (!newPost) return;
    const result = await supabase.from('Posts').insert([{ content: newPost, user_id: user?.id }]);
    const { error } = result;
    if (!error) {
      setNewPost('');
    } else {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Post Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postContent}>{item.content}</Text>
            <Text style={styles.timestamp}>{moment(item.created_at).fromNow()}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write a post..."
          value={newPost}
          onChangeText={setNewPost}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={addPost}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});
