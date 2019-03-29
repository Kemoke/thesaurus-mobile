import React from 'react';
import styles from './style';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Button, Header, Input} from 'react-native-elements';
import {Ionicons} from "@expo/vector-icons";
import {SynonymContextWrapper} from "../../SynonymContext";
import type {SynonymContextProps} from "../../SynonymContext";
import KeyboardAvoidingView from "../../util/KeyboardAvoidingView";


type AddWordViewProps = {
    synonymContext: SynonymContextProps
}

const initState = {
    word: '',
    synonyms: ['']
};

export class AddWordViewComponent extends React.Component<AddWordViewProps> {
    state = initState;

    onSave = () => {
        const {word, synonyms} = this.state;
        synonyms.forEach(synonym => {
            this.props.synonymContext.addSynonym(word, synonym)
        });
        this.setState(initState);
    };

    onSynonymChange = (synonym, index) => {
        const synonyms = [...this.state.synonyms];
        synonyms[index] = synonym;
        this.setState({synonyms});
    };

    addSynonym = () => this.setState({synonyms: [...this.state.synonyms, '']});

    removeSynonym = (index) => {
        const synonyms = [...this.state.synonyms];
        synonyms.splice(index, 1);
        this.setState({synonyms});
    };

    render() {
        const {word, synonyms} = this.state;
        return (
            <KeyboardAvoidingView verticalOffset={40}>
                <Header centerComponent={{text: 'ADD NEW WORD', style: {color: "#FFF"}}}/>
                <ScrollView contentContainerStyle={styles.mainContainer}>
                    <Text style={styles.label}>Word</Text>
                    <Input placeholder="Enter word"
                           value={word}
                           testID='wordInput'
                           onChangeText={word => this.setState({word})}/>
                    <Text style={styles.label}>Synonyms</Text>
                    {synonyms.map((synonym, index) => (
                        <View key={index} style={styles.synonymInputContainer}>
                            <Input
                                placeholder="Enter synonym"
                                containerStyle={styles.synonymInput}
                                value={synonym}
                                testID={`synonymInput${index}`}
                                onChangeText={text => this.onSynonymChange(text, index)}/>
                            <Ionicons name='md-trash'
                                      size={25}
                                      color='#dc3545'
                                      testID={`synonymRemove${index}`}
                                      style={styles.deleteIcon}
                                      onPress={() => this.removeSynonym(index)}/>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addButton}
                                      testID={`addSynonym`}
                                      onPress={this.addSynonym}>
                        <Ionicons name={'ios-add'}
                                  size={25}
                                  style={styles.addIcon}
                                  color='#3CBD3F'/>
                        <Text style={styles.addText}>Add synonym</Text>
                    </TouchableOpacity>
                    <View style={styles.saveButtonContainer}>
                        <View style={styles.saveButton}>
                            <Button title="Save"
                                    onPress={this.onSave}/>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export default SynonymContextWrapper(AddWordViewComponent)