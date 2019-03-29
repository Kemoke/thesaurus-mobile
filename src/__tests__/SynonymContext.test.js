import React from 'react';
import {shallow} from "enzyme";
import {SynonymContextWrapper} from "../SynonymContext";
import {View} from "react-native";

describe('SynonymContextWrapper', function () {
    it('should wrap component properly', function () {
        const WrappedView = SynonymContextWrapper(View);
        const component = shallow(
            <WrappedView testProp="test"/>
        );
        expect(component).toMatchSnapshot();
        const context = {
            words: {test: ["test"]}
        };
        const wrappedComponent = shallow(component.props().children(context));
        expect(wrappedComponent).toMatchSnapshot();
    });
});