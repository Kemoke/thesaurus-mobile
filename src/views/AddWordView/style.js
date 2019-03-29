import {StyleSheet} from "react-native";

export default StyleSheet.create({
    mainContainer: {
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 32,
        backgroundColor: '#FFF'
    },
    synonymInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 8
    },
    synonymInput: {
        width: '90%'
    },
    label: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 16,
    },
    deleteIcon: {
        marginRight: 12
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 8,
        width: 150
    },
    addText: {
        color: '#3CBD3F'
    },
    addIcon: {
        marginRight: 8
    },
    saveButtonContainer: {
        alignItems: 'center',
        marginTop: 16
    },
    saveButton: {
        width: 150,
    }
})