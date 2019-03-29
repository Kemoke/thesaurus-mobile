import React from "react";
import {shallow} from 'enzyme'
import {AddWordViewComponent} from "../AddWordView";

describe('Add Word View', () => {
    it('should render correctly', function () {
        const component = shallow(
            <AddWordViewComponent synonymContext={{}}/>
        );
        expect(component).toMatchSnapshot();
    });
    it('should handle saving synonyms', function () {
        const context = {
            addSynonym: jest.fn(),
            words: {}
        };
        const component = shallow(
            <AddWordViewComponent synonymContext={context}/>
        );
        component.setState({word: 'test', synonyms: ['test1', 'test2']});
        component.instance().onSave();
        expect(context.addSynonym).toHaveBeenCalledWith('test', 'test1');
        expect(context.addSynonym).toHaveBeenCalledWith('test', 'test2');
        expect(component.state()).toEqual({word: '', synonyms: ['']})
    });
    it('should handle word input', function () {
        const component = shallow(
            <AddWordViewComponent synonymContext={{}}/>
        );
        component.findWhere(node => node.prop('testID') === 'wordInput').props().onChangeText("test");
        expect(component.state("word")).toEqual("test")
    });
    it('should handle synonym input', function () {
        const component = shallow(
            <AddWordViewComponent synonymContext={{}}/>
        );
        component.setState({synonyms: ['test1', 'test2', 'test3']});
        component.findWhere(node => node.prop('testID') === 'synonymInput0').props().onChangeText("testnew1");
        expect(component.state("synonyms")[0]).toEqual("testnew1");
        component.findWhere(node => node.prop('testID') === 'synonymInput1').props().onChangeText("testnew2");
        expect(component.state("synonyms")[1]).toEqual("testnew2");
        component.findWhere(node => node.prop('testID') === 'synonymInput2').props().onChangeText("testnew3");
        expect(component.state("synonyms")[2]).toEqual("testnew3");
    });
    it('should handle adding synonyms', function () {
        const component = shallow(
            <AddWordViewComponent synonymContext={{}}/>
        );
        component.findWhere(node => node.prop('testID') === 'addSynonym').props().onPress();
        expect(component.state("synonyms").length).toEqual(2)
    });
    it('should handle removing synonyms', function () {
        const component = shallow(
            <AddWordViewComponent synonymContext={{}}/>
        );
        component.setState({synonyms: ['test1', 'test2', 'test3']});
        component.findWhere(node => node.prop('testID') === 'synonymRemove1').props().onPress();
        expect(component.state("synonyms")).toEqual(["test1", "test3"]);
    });
});