import {useLayoutEffect, useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Button
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {MEALS} from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import SubTitle from '../components/MealDetail/SubTitle';
import List from '../components/MealDetail/Lists';
import IconButton from '../components/IconButton';
import {addFavorite, removeFavorite} from '../store/redux/favorites';
// import { FavoritesContext } from '../store/context/favorites-context';

function MealsDetailScreen({route, navigation}) { // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();

    const mealId = route.params.mealId;
    const meal = MEALS.find((meal) => meal.id === mealId);

    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
    const mealIsFavorite = favoriteMealIds.includes(mealId);

    function headerButtonHandler() {
        if (mealIsFavorite) { // favoriteMealsCtx.removeFavorite(mealId);
            dispatch(removeFavorite({id: mealId}));
        } else { // favoriteMealsCtx.addFavorite(mealId);
            dispatch(addFavorite({id: mealId}));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon={
                        mealIsFavorite ? 'star' : 'star-outline'
                    }
                    color="white"
                    onTap={headerButtonHandler}/>
            }
        });
    }, [navigation, headerButtonHandler]);

    return (
        <ScrollView style={
            styles.container
        }>
            <Image source={
                    {uri: meal.imageUrl}
                }
                style={
                    styles.image
                }/>
            <Text style={
                styles.title
            }>
                {
                meal.title
            }</Text>
            <MealDetails textStyle={
                    styles.textStyle
                }
                duration={
                    meal.duration
                }
                complexity={
                    meal.complexity
                }
                affordability={
                    meal.affordability
                }/>
            <View style={
                styles.listOuterContainer
            }>
                <View style={
                    styles.listContainer
                }>
                    <SubTitle>Ingredients</SubTitle>
                    <List data={
                        meal.ingredients
                    }/>
                    <SubTitle>Steps</SubTitle>
                    <List data={
                        meal.steps
                    }/>
                </View>
            </View>
        </ScrollView>
    );
}

export default MealsDetailScreen;

const styles = StyleSheet.create({
    container: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    textStyle: {
        color: 'white'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        maxWidth: '80%'
    }
});
