import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { MealList } from '../../api/commands';
import { useCommand } from '../../api/hooks';
import { isLoaded } from '../../api/utils';
import { IMeal } from '../../types/meal';
import { useForkedState } from '../../utils/hooks/general';
import theme from '../../utils/theme';
import moment from "moment"

const MealListView = () => {
    const navigation = useNavigation();
    const mealsRequest = useCommand(MealList)
    const [meals, setMeals] = useForkedState(rq => isLoaded(rq) ? rq.data : null, mealsRequest) as [IMeal[] | null, (value: IMeal[] | null) => void];

    useEffect(() => {
        const handleRefresh = () => {
            if (mealsRequest?._refresh) {
                setMeals(null);
                mealsRequest._refresh()
            }
        }

        const focusListener = navigation.addListener("focus", handleRefresh);
        return focusListener;
    }, [navigation]);

    if (meals === null)
        return <ActivityIndicator size={36} color={theme.palette.primary} />


    return (
        <>
            <View style={styles.sectionContainer}>
                {
                    meals &&
                    meals.sort(sortByDate).map((meal) => <SingleMealItem key={meal.id} {...meal} />)
                }
            </View>
        </>
    );
};

const SingleMealItem = (props: IMeal & { key: string }) => {

    return <View style={styles.flex}>
        <Text style={{ flex: 2 }}>{props.amount}</Text>
        <Text style={{ flex: 2 }}>{props.author.name}</Text>
        <Text style={{ flex: 2 }}>{moment(props.timestamp).fromNow()}</Text>
    </View>
}

const sortByDate = (a: IMeal, b: IMeal) => {
    if (new Date(a.timestamp) > new Date(b.timestamp)) return 1;
    if (new Date(a.timestamp) < new Date(b.timestamp)) return -1;
    return 0;
}

const styles = StyleSheet.create({
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default MealListView;
