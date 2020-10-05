import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { MealList } from '../../api/commands';
import { useCommand } from '../../api/hooks';
import { isLoaded } from '../../api/utils';
import { IMeal } from '../../types/meal';
import { useForkedState } from '../../utils/hooks/general';

const MealListView = () => {
    const mealsRequest = useCommand(MealList)
    const [meals] = useForkedState<typeof mealsRequest, IMeal>(rq => isLoaded(rq) ? rq.data : null, mealsRequest);

    return (
        <>
            <View style={styles.sectionContainer}>
                {
                    meals &&
                    meals.sort(sortByDate).map((meal: IMeal) => <SingleMealItem {...meal} />)
                }
            </View>
        </>
    );
};

const SingleMealItem = (props: IMeal) => {

    return <View style={styles.flex}>
        <Text>{props.amount}</Text>
        <Text>{props.author.name}</Text>
        <Text>{new Date(props.timestamp).toDateString()}</Text>
    </View>
}

const sortByDate = (a: IMeal, b: IMeal) => {
    if (new Date(a.timestamp) > new Date(b.timestamp)) return 1;
    if (new Date(a.timestamp) < new Date(b.timestamp)) return -1;
    return 0;
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default MealListView;
