import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import theme from "../../utils/theme";


const LoadingView = () => {
    return <View style={styles.root}>
        <ActivityIndicator size={64} color={theme.palette.primary} />
    </View>
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
});

export default LoadingView;