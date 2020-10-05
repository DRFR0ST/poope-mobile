import React from 'react';
import {
    StyleSheet,
    Text,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { MealCreate } from '../../api/commands';

import { useDispatchCommand } from '../../api/hooks';
import { randomInt } from '../../utils/methods';

const CreateMealFab = () => {
    const dispatch = useDispatchCommand();

    const handleCreate = () => {
        dispatch(MealCreate, randomInt(30, 120), "B3r7ivZXDX1mTssTVOzT");
    }

    return (
        <Pressable onPress={handleCreate} style={styles.root}>
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

    },
    text: { margin: 0, padding: 0, textAlign: "center", lineHeight: 48, color: "#FFF", fontSize: 22 }
});

export default CreateMealFab;
