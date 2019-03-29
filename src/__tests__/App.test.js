import React from 'react';
import {shallow} from "enzyme";
import App from "../App";

describe('App', function () {
    it('should render correctly', function () {
        const component = shallow(
            <App/>
        );
        expect(component).toMatchSnapshot();
    });
    it('should add new synonym properly', function () {
        const component = shallow(
            <App/>
        );
        component.instance().addSynonym("test", "test2");
        expect(component.state("words")).toEqual({
            "test": ["test2"],
            "test2": ["test"]
        })
    });
    it('should append synonym word existing in map', function () {
        const component = shallow(
            <App/>
        );
        component.setState({
            words: {
                "test": ["test2"],
                "test2": ["test3", "test"],
                "test3": ["test2"],
            }
        });
        component.instance().addSynonym("test", "test3");
        expect(component.state("words")).toEqual({
            "test": ["test2", "test3"],
            "test2": ["test3", "test"],
            "test3": ["test2", "test"],
        })
    });
});