//Search Page
import React from 'react'
import { View, SafeAreaView } from 'react-native'
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from './SearchBox';
import { styles } from '../Style';
import RefinementList from './RefinementList';
import InfiniteHits from './InfiniteHits';
import ButtonNavBar from '../modules/NavBar'
import TopHeaderBar from '../modules/TopHeaderBar';

//Configure the algoliasearch settings using our API key and APP ID
const searchClient = algoliasearch(
  "9YLY0N9A8X",
  "8cd333f7b3ef8b8212c6ff67cd33c3ec"
)

//Implement all pages to search with Algolia
const Search = ({navigation}) => {

  return (
    <View style = {styles.page}>

      <View>
        <TopHeaderBar navigation={navigation}/>
      </View>

      <SafeAreaView style = {styles.flatlist}>

      {/*InstantSearch provided by Algolia to make the search happen. Calls the indexname that we called "users"*/}
       <InstantSearch 
          searchClient={searchClient}
          indexName="users"
        >
         
      {/*Calls our search box, refinement list, infinitehits"*/}
      <View style = {styles.search_bar}>
        <SearchBox />
      </View>
      
      <View>
        <RefinementList  attribute="Username" />
      </View>
      
      
      <InfiniteHits />
      
      
      
       </InstantSearch>

        <View style = {styles.navs}>
          <ButtonNavBar navigation={navigation}/>
        </View> 

      </SafeAreaView>

    </View>
  )
}

export default Search
