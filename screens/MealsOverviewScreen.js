import { useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
// import { useRoute } from '@react-navigation/native';

import { MEALS, CATEGORIES } from '../data/dummy-data';
import MealsList from '../components/MealsList/MealsList';


function MealsOverviewScreen({ route, navigation }) {
    // const route = useRoute();
    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;

        navigation.setOptions({
            title: categoryTitle,
        });
    }, [catId, navigation]);

    function mealItePressHandler(id) {
        navigation.navigate('MealsDetailScreen', {
            mealId: id
        });
    }

    return <MealsList items={displayedMeals}/>
    
};

export default MealsOverviewScreen;

