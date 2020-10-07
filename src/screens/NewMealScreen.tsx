import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable, ToastAndroid } from "react-native";
import { MealCreate } from "../api/commands";
import { useDispatchCommand } from "../api/hooks";

type NewMealScreenProps = { route: RouteProp<Record<string, { userId: string }>, "NewMeal">, navigation: NavigationProp<Record<string, any>> }

const NewMealScreen = (props: NewMealScreenProps) => {
    const [amount, setAmount] = useState("0");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatchCommand();

    const handleCreate = (value: number) => async () => {
        if (loading) return;

        if (value === undefined || isNaN(value)) {
            ToastAndroid.showWithGravityAndOffset(
                "An error occurred",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return;
        }

        setLoading(true);

        await dispatch(MealCreate, Number(value), props.route?.params?.userId);

        ToastAndroid.showWithGravityAndOffset(
            "Entry added",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );

        setLoading(false);
        props.navigation.goBack();
    }

    return <View style={styles.root}>
        <TextInput selectTextOnFocus keyboardType="numeric" value={amount} onChangeText={setAmount} placeholder="Amount" />

        <Pressable android_ripple disabled={amount === "0" || amount.length <= 0} style={styles.pressableStyle} onPress={handleCreate(Number(amount))}>
            <Text>Add entry</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10
    },
    pressableStyle: {
        marginTop: 20
    }
});

export default NewMealScreen;