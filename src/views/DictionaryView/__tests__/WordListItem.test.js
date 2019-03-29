import React from 'react';
import {shallow} from "enzyme";
import WordListItem from "../WordListItem";

describe('Word List Item', function () {
    it('should render properly', function () {
        const item = {
            word: "test",
            synonyms: ["test1", "test2"]
        };
        const component = shallow(
            <WordListItem item={item}/>
        );
        expect(component.instance().keyExtractor("test1")).toEqual("test1");
        expect(component).toMatchSnapshot();
    });
    it('should render expanded properly', function () {
        const item = {
            word: "test",
            synonyms: ["test1", "test2"]
        };
        const component = shallow(
            <WordListItem item={item}/>
        );
        component.setState({expanded: true});
        expect(component).toMatchSnapshot();
    });
    it('should handle toggling list expansion', function () {
        const item = {
            word: "test",
            synonyms: ["test1", "test2"]
        };
        const component = shallow(
            <WordListItem item={item}/>
        );
        component.findWhere(node => node.prop('testID') === "wordItem").props().onPress();
        expect(component.state("expanded")).toEqual(true);
        component.findWhere(node => node.prop('testID') === "wordItem").props().onPress();
        expect(component.state("expanded")).toEqual(false);
    });
    it('should render synonym item properly', function () {
        const item = {
            word: "test",
            synonyms: ["test1", "test2"]
        };
        const component = shallow(
            <WordListItem item={item}/>
        );
        const synonymItem = shallow(component.instance().renderSynonymItem({item: "test1"}));
        expect(synonymItem).toMatchSnapshot();
    });
});