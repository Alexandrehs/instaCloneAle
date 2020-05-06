import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Post, Header, Avatar, Name, PostImage, Description } from './style';

export default function Feeds() {

  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function loadPage(pageNumber = page) {
    if(total && pageNumber > total) return;

    const response = await fetch(`http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`);

    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');

    setTotal(Math.floor(totalItems / 5));
    setFeed([...feed, ...data]);
    setPage(pageNumber + 1);
  }

  useEffect(() => {
    loadPage();
  }, []);

  return(
    <View style={{backgroundColor: '#fff', flex:1}}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={feed}
        keyExtractor={item => String(item.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
                <Name>{ item.author.name }</Name>
            </Header>

            <PostImage ratio={ item.aspectRatio } source={{ uri:item.image }} />

            <Description>
              <Name>{ item.author.name }</Name> { item.description }
            </Description>
          </Post>
        )}
      />
    </View>
  );
}