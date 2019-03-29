import React from 'react';
import {FlatList, Text, View} from "react-native";
import {Header, SearchBar} from "react-native-elements";
import styles from './style';
import {SynonymContextWrapper} from "../../SynonymContext";
import type {SynonymContextProps} from "../../SynonymContext";
import WordListItem from "./WordListItem";
import KeyboardAvoidingView from "../../util/KeyboardAvoidingView";

type DictionaryViewProps = {
    synonymContext: SynonymContextProps
}

export class DictionaryViewComponent extends React.Component<DictionaryViewProps> {

    state = {
        search: ''
    };

    updateSearch = search => this.setState({search});

    keyExtractor = (item) => item.word;

    render() {
        const {search} = this.state;
        const wordEntries = Object.entries(this.props.synonymContext.words).map((entry) => ({
            word: entry[0],
            synonyms: entry[1]
        })).filter(entry => entry.word.indexOf(search) !== -1);
        return (
            <KeyboardAvoidingView verticalOffset={40} style={styles.mainContainer}>
                <Header centerComponent={{text: 'DICTIONARY', style: {color: "#FFF"}}}/>
                <SearchBar placeholder="Search for synonyms"
                           lightTheme
                           testID='searchBar'
                           value={this.state.search}
                           onChangeText={this.updateSearch}/>
                {wordEntries.length === 0 ?
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>
                            No synonyms found
                        </Text>
                    </View>
                    :
                    <FlatList keyExtractor={this.keyExtractor}
                              data={wordEntries}
                              testID='wordList'
                              renderItem={({item}) => <WordListItem item={item}/>}/>
                }
            </KeyboardAvoidingView>
        );
    }
}

export default SynonymContextWrapper(DictionaryViewComponent)