import React from 'react';

export type SynonymContextProps = {
    words: Map<String, Array<string>>,
    addSynonym: (word: string, synonym: string) => void
}

export const SynonymContext = React.createContext({
    words: {},
    addSynonym: (word, synonym) => {}
});

export const SynonymContextWrapper = (Component) => (props) => (
    <SynonymContext.Consumer>
        {ctx => (
            <Component {...props} synonymContext={ctx}/>
        )}
    </SynonymContext.Consumer>
);