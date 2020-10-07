import React from "react";
import { Text, StyleSheet, View, Pressable, Image, Dimensions } from "react-native";
import { useCommand } from "../api/hooks";
import { UserList } from "../api/commands";
import { isLoaded } from "../api/utils";
import { useForkedState } from "../utils/hooks/general";
import { IUser } from "../types/user";
import { useNavigation } from "@react-navigation/native";

const ProfileSelectionScreen = () => {
    const usersRequest = useCommand(UserList)
    const [users] = useForkedState(rq => isLoaded(rq) ? rq.data : null, usersRequest) as [IUser[] | null];

    return <View style={styles.root}>
        {users && users?.map(user => <ProfileItem key={user.id} {...user} />)}
    </View>
}

const ProfileItem = (user: IUser & { key: string }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("Home", { userId: user.id });
    }

    return <View style={{ borderRadius: 48, overflow: "hidden" }}>
        <Pressable android_ripple={{ color: "#00000026", radius: Dimensions.get("screen").width }} onPress={handlePress} style={styles.itemRoot}>
            <Image source={{ uri: user.avatar_url }} alt="avatar" style={styles.itemAvatar} />
            <Text style={styles.itemName}>{user.name}</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 20
    },
    itemRoot: {
        marginVertical: 10,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 48
    },
    itemAvatar: {
        width: 48,
        height: 48,
        marginRight: 12,
        borderRadius: 48
    },
    itemName: {
        fontSize: 28,
        padding: 0,
        margin: 0,
    }
});

export default ProfileSelectionScreen;