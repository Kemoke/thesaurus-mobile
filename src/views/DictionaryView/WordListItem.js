import React from 'react';
import {FlatList, View} from "react-native";
import {ListItem} from "react-native-elements";

type WordListItemProps = {
    item: {
        word: string,
        synonyms: Array<string>
    }
}

export default class WordListItem extends React.Component<WordListItemProps>{
    state = {
        expanded: false
    };

    renderSynonymItem = ({item}) => (
        <View>
            <ListItem containerStyle={{backgroundColor: '#EEEEEE'}}
                      contentContainerStyle={{paddingLeft: 16}}
                      title={item}
                      bottomDivider/>
        </View>
    );

    toggleSynonymList = () => this.setState({expanded: !this.state.expanded});

    keyExtractor = (item) => item;

    render() {
        const {item} = this.props;
        const {expanded} = this.state;
        return (
            <View>
                <ListItem title={item.word}
                          badge={{value: item.synonyms.length}}
                          bottomDivider
                          chevron
                          testID='wordItem'
                          onPress={this.toggleSynonymList}/>
                {expanded && <FlatList keyExtractor={this.keyExtractor}
                                       data={item.synonyms}
                                       renderItem={this.renderSynonymItem}/>}
            </View>
        );
    }
}