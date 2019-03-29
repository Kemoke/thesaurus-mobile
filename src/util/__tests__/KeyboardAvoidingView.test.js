import React from "react";
import {shallow} from 'enzyme'
import {Dimensions, Keyboard, NativeModules, Platform, StatusBarIOS} from "react-native";
import KeyboardAvoidingView from "../KeyboardAvoidingView";
const {StatusBarManager} = NativeModules;

const {height: windowHeight} = Dimensions.get('window');

StatusBarManager.getHeight = () => ({
    height: 0
});
StatusBarIOS.addListener = () => ({remove: () => {}});

describe('KeyboardAvoidingView', function () {
    it('should render properly', function () {
        const component = shallow(
            <KeyboardAvoidingView/>
        );
        expect(component).toMatchSnapshot();
    });
    it('should render style array', function () {
        const component = shallow(
            <KeyboardAvoidingView style={[{height: 50}]}/>
        );
        expect(component).toMatchSnapshot();
    });
    it('should handle keyboard opening', function () {
        const openKeyboardListeners = [];
        const closeKeyboardListeners = [];
        Keyboard.addListener = jest.fn((name, callback) => {
            if (name === 'keyboardDidShow' || name === 'keyboardWillShow') {
                openKeyboardListeners.push(callback);
            }
            if (name === 'keyboardWillHide' || name === 'keyboardDidHide') {
                closeKeyboardListeners.push(callback);
            }
        });
        let platformTested = 'ios';
        Platform.select = config => () => config[platformTested]();
        const component = shallow(
            <KeyboardAvoidingView/>
        );
        openKeyboardListeners.forEach(callback => {
            callback({
                endCoordinates: {
                    height: 150
                }
            })
        });
        expect(component.instance().getKeyboardOffset()).toEqual({
            paddingBottom: 150
        });
        closeKeyboardListeners.forEach(callback => callback());
        expect(component.instance().getKeyboardOffset()).toEqual({
            paddingBottom: 0
        });
        platformTested = 'android';
        openKeyboardListeners.forEach(callback => {
            callback({
                endCoordinates: {
                    height: 150
                }
            })
        });
        expect(component.instance().getKeyboardOffset()).toEqual({
            height: windowHeight - 150
        });
        closeKeyboardListeners.forEach(callback => callback());
        expect(component.instance().getKeyboardOffset()).toEqual({
            height: windowHeight
        });
    });
    it('should unregister listeners on unmount', function () {
        Keyboard.removeListener = jest.fn();
        const component = shallow(
            <KeyboardAvoidingView/>
        );
        component.instance().componentWillUnmount();
        expect(Keyboard.removeListener).toHaveBeenCalledWith("keyboardDidShow", component.instance().handleKeyboardShow);
        expect(Keyboard.removeListener).toHaveBeenCalledWith("keyboardWillShow", component.instance().handleKeyboardShow);
        expect(Keyboard.removeListener).toHaveBeenCalledWith("keyboardWillHide", component.instance().handleKeyboardHide);
        expect(Keyboard.removeListener).toHaveBeenCalledWith("keyboardDidHide", component.instance().handleKeyboardHide);
    });
});