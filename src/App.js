import React from 'react';
import DictionaryView from "./views/DictionaryView/DictionaryView";
import {
    createBottomTabNavigator,
    createAppContainer,
    NavigationScreenConfigProps
} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons'
import AddWordView from "./views/AddWordView/AddWordView";
import {ThemeProvider, Theme} from "react-native-elements";
import {SynonymContext} from './SynonymContext'

const routes = [
    {
        title: "Dictionary",
        component: DictionaryView,
        icon: 'ios-book'
    },
    {
        title: "Add Word",
        component: AddWordView,
        icon: 'ios-add'
    }
];

const bottomTabNavigator = createBottomTabNavigator(routes.reduce((routeMap, route) => {
    routeMap[route.title] = route.component;
    return routeMap;
}, {}), {
    defaultNavigationOptions: ({navigation}: NavigationScreenConfigProps) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            const route = routes.find((route) => route.title === routeName);
            return <Ionicons name={route.icon} size={25} color={tintColor}/>
        }
    }),
    tabBarOptions: {
        activeTintColor: "#3CBD3F"
    }
});

const AppContainer = createAppContainer(bottomTabNavigator);

const appTheme: Theme = {
    colors: {
        primary: "#3CBD3F"
    }
};

export default class App extends React.Component {
    state = {
        words: {}
    };

    addSynonym = (word, synonym) => {
        const {words} = this.state;
        if (!words[word]) {
            words[word] = []
        }
        if (words[word].indexOf(synonym) === -1) {
            words[word].push(synonym);
        }

        if (!words[synonym]) {
            words[synonym] = []
        }
        if (words[synonym].indexOf(word) === -1) {
            words[synonym].push(word)
        }
        this.setState(words);
    };

    render() {
        return (
            <ThemeProvider theme={appTheme}>
                <SynonymContext.Provider value={{words: this.state.words, addSynonym: this.addSynonym}}>
                    <AppContainer/>
                </SynonymContext.Provider>
            </ThemeProvider>
        );
    }
}

