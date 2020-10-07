import React from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const FloatingActionButton = ({ onPress }: { onPress: () => void }) => {
    const handlePress = () => {
        onPress();
    }

    return (
        <Pressable onPress={handlePress} style={styles.root}>
            <Text style={styles.text}>+</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    root: {
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: "#BD0000",
        position: "absolute",
        zIndex: 5,
        right: 10,
        bottom: 15,
        elevation: 4
    },
    text: { margin: 0, padding: 0, textAlign: "center", lineHeight: 48, color: "#FFF", fontSize: 22 }
});

export default FloatingActionButton;
