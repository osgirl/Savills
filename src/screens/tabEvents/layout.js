import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from "../../components/calendars";
import HeaderTitle from '../../components/headerTitle';

let DATA = [
    
]

export default class Layout extends Component {

    render() {
        let dataSelected = this.mapObjectSelected();
        return (
            <View style={styles.container}>
                <ScrollView>
                    <LinearGradient
                        colors={['#4A89E8', '#8FBCFF']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={styles.linearGradient}>
                        <HeaderTitle title='Events' />
                        <Calendar
                            minDate={'2017-05-10'}
                            maxDate={'2020-01-01'}
                            onDayPress={this.onDayPress}
                            style={styles.calendar}
                            backgroundColor={'transparent'}
                            markingType={'custom'}
                            markedDates={dataSelected}
                            theme={{
                                todayTextColor: '#343D4D',
                                arrowColor: '#FFF',
                                selectedDayBackgroundColor: '#fff',
                                monthTextColor: '#FFF',
                                textSectionTitleColor: '#FFF',
                                textDayHeaderFontSize: 15,
                            }}
                        />
                    </LinearGradient>
                    <FlatList 
                    
                    />
                </ScrollView>
            </View>
        );
    }

    renderItem(){
        return (
            <Text>
                dsdasdasd
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
