import React from 'react';
import {Dimensions, Keyboard, Platform, View, ViewProps, NativeModules, StatusBarIOS} from "react-native";
const {StatusBarManager} = NativeModules;

const {height: windowHeight} = Dimensions.get('window');

type KeyboardAvoidingViewProps = {
    verticalOffset?: number
} & ViewProps

export default class KeyboardAvoidingView extends React.Component<KeyboardAvoidingViewProps>{
    static defaultProps = {
        verticalOffset: 0
    };
    constructor(props) {
        super(props);
        this.state = {
            keyboardOffset: props.verticalOffset,
            statusBarHeight: 0
        };
        Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.addListener('keyboardWillHide', this.handleKeyboardHide);
        Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide);
    }

    componentWillUnmount(){
        Keyboard.removeListener('keyboardDidShow', this.handleKeyboardShow);
        Keyboard.removeListener('keyboardWillShow', this.handleKeyboardShow);
        Keyboard.removeListener('keyboardWillHide', this.handleKeyboardHide);
        Keyboard.removeListener('keyboardDidHide', this.handleKeyboardHide);
        if (Platform.OS === 'ios') this.statusBarListener.remove();
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight((statusBarFrameData) => {
                this.setState({statusBarHeight: statusBarFrameData.height});
            });
            this.statusBarListener = StatusBarIOS.addListener('statusBarFrameWillChange', (statusBarData) => {
                this.setState({statusBarHeight: statusBarData.frame.height});
            });
        }
    }

    handleKeyboardShow = ({endCoordinates: { height }}) => {
        this.setState({keyboardOffset: height});
    };

    handleKeyboardHide = () => {
        this.setState({keyboardOffset: this.props.verticalOffset})
    };

    getKeyboardOffset = () => {
        const {keyboardOffset, statusBarHeight} = this.state;
        return Platform.select({
            ios: () => ({paddingBottom: keyboardOffset - statusBarHeight * 2}),
            android: () => ({height: windowHeight - keyboardOffset})
        })();
    };

    render() {
        const {style, ...props} = this.props;
        let viewStyle = [{height: '100%'}, this.getKeyboardOffset()];
        if (Array.isArray(style)) {
            viewStyle = [...viewStyle, ...style];
        } else {
            viewStyle.splice(0,0,style);
        }
        return (
            <View style={viewStyle} {...props}/>
        );
    }
}
