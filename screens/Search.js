import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from './SearchBox';
import { styles } from '../Style';
import RefinementList from './RefinementList';
import InfiniteHits from './InfiniteHits';
import ButtonNavBar from '../modules/NavBar'

//Configure the algoliasearch settings using our API key and APP ID
const searchClient = algoliasearch(
  "9YLY0N9A8X",
  "8cd333f7b3ef8b8212c6ff67cd33c3ec"
)

const Search = ({navigation}) => {
  return (
    <SafeAreaView styles={styles.page}>

      {/*InstantSearch provided by Algolia to make the search happen. Calls the indexname that we called "users"*/}
      <InstantSearch
        searchClient={searchClient}
        indexName="users"
      >
         {/*Calls our search box, refinement list, infinitehits"*/}
      <SearchBox />
      <RefinementList  attribute="Username" />
      <InfiniteHits />
  
      </InstantSearch>
        <SafeAreaView style = {styles.nav}>
          <ButtonNavBar/>
        </SafeAreaView>

    </SafeAreaView>

  )
}

export default Search
