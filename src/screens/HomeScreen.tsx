import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet, View, Image, Pressable, Dimensions } from "react-native";
import { UserInfo } from "../api/commands";
import { useCommand } from "../api/hooks";
import { isLoaded } from "../api/utils";
import LoadingView from "../components/shared/LoadingView";
import { useForkedState } from "../utils/hooks/general";
import FloatingActionButton from "../components/shared/FloatingActionButton";
import MealListView from "../components/shared/MealListView";
import { IUser } from "../types/user";

type HomeScreenRouteParams = { userId: string }
type HomeScreenProps = { route: RouteProp<Record<string, HomeScreenRouteParams>, "Home">, navigation: NavigationProp<Record<string, any>> }

const HomeScreen = (props: HomeScreenProps) => {
    const userRequest = useCommand<IUser>(UserInfo, props.route?.params?.userId)
    const [user] = useForkedState(rq => isLoaded(rq) ? rq.data : null, userRequest) as [IUser | null];

    const handleAvatarPress = () => {
        props.navigation.navigate("ProfileSelection");
    }

    const handleFabPress = () => {
        props.navigation.navigate("NewMeal", { ...props.route?.params });
    }

    if (user === null)
        return <LoadingView />

    return <>
        <View style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hi {user.name}</Text>
                <View style={{ borderRadius: 48, overflow: "hidden" }}>
                    <Pressable android_ripple={{ color: "#00000026", radius: 64 }} onPress={handleAvatarPress}>
                        <Image source={{ uri: user.avatar_url }} alt="avatar" style={styles.headerAvatar} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.mealListContainer}>
                <MealListView />
            </View>
        </View>
        <FloatingActionButton onPress={handleFabPress} />
    </>
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerTitle: {
        fontSize: 32,
    },
    headerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 48,
    },
    mealListContainer: {
        marginVertical: 12
    }
});

HomeScreen.navigationOptions = {
    header: "none"
}

export default HomeScreen;