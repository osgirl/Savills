import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Header from '@components/header'
import IC_MENU from "@resources/icons/icon_tabbar_active.png";

import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from "../../components/calendars";

export default class TabEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: ['2018-10-31', '2018-10-29', '2018-10-20', '2018-10-19']
        };
        this.onDayPress = this.onDayPress.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        header: <Header
            leftIcon={IC_MENU}
            leftAction={navigation.toggleDrawer}
            // center={function () {
            //     return <View><Text>{this.app.test}</Text></View>
            // }}
            rightIcon={IC_MENU}
            rightAction={() => alert('Notify')}
        />
    })

    onDayPress(day) {
        console.log('___day.dateString_________', day.dateString);
        // this.setState({
        //     selected: day.dateString
        // });
    }

    mapObjectSelected() {
        let markedDateMap = {}
        this.state.selected.map(item => {
            markedDateMap[item] = {
                selected: true,
                // disableTouchEvent: true,
                selectedDotColor: 'orange',
                customStyles: {
                    container: {
                        backgroundColor: 'white',
                        elevation: 2
                    },
                    text: {
                        color: 'black',
                        fontWeight: 'bold'
                    },
                }
            }
        })
        return markedDateMap;
    }


    render() {
        let dataSelected = this.mapObjectSelected();
        return (
            <View style={styles.container}>
                <ScrollView>
                    <LinearGradient
                        colors={['#4A89E8', '#8FBCFF']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        style={styles.linearGradient}>
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
                                selectedDayTextColor: '#4A89E8',
                            }}
                        />
                    </LinearGradient>
                </ScrollView>
            </View>
        );
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
