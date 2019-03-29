import React from 'react';
import {shallow} from "enzyme";
import {DictionaryViewComponent} from "../DictionaryView";

describe('Dictionary view', function () {
    it('should render properly', function () {
        const context = {
            words: {
                "test": ["test2", "test3"],
                "test2": ["test"],
                "test3": ["test"]
            }
        };
        const component = shallow(
            <DictionaryViewComponent synonymContext={context}/>
        );
        expect(component.instance().keyExtractor({word: "test"})).toEqual("test");
        expect(component).toMatchSnapshot();
    });
    it('should render empty properly', function () {
        const context = {
            words: {}
        };
        const component = shallow(
            <DictionaryViewComponent synonymContext={context}/>
        );
        expect(component).toMatchSnapshot();
    });
    it('should render correct list component', function () {
        const context = {
            words: {
                "test": ["test2", "test3"],
                "test2": ["test"],
                "test3": ["test"]
            }
        };
        const component = shallow(
            <DictionaryViewComponent synonymContext={context}/>
        );
        const RenderedComponent = component.findWhere(node => node.prop('testID') === 'wordList').props().renderItem;
        const listComponent = shallow(
            <RenderedComponent item={{
                word: "test",
                synonyms: []
            }}/>
        );
        expect(listComponent).toMatchSnapshot();
    });
    it('should handle search input', function () {
        const context = {
            words: {}
        };
        const component = shallow(
            <DictionaryViewComponent synonymContext={context}/>
        );
        component.findWhere(node => node.prop('testID') === "searchBar").props().onChangeText("test");
        expect(component.state("search")).toEqual("test");
    });
});