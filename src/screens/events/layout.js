import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '../../components/headerTitle';

import { Agenda } from "../../components/calendar";

const { width, height } = Dimensions.get('window');

import IC_CALENDAR from "../../resources/icons/calendar.png";
import IC_CLOCK from "../../resources/icons/clock.png";

let DATA = [

]

export default class Layout extends Component {

    render() {
        let dataSelected = this.mapObjectSelected();
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={'2018-10-22'}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#666'},
                //    '2017-05-09': {textColor: '#666'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{
                    // calendarBackground: 'red',
                    // agendaKnobColor: 'green'
                // }}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
            />
        );
    }

    loadItems(day) {
        // setTimeout(() => {
        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
                this.state.items[strTime] = [];
                const numItems = Math.floor(Math.random() * 5);
                for (let j = 0; j < numItems; j++) {
                    this.state.items[strTime].push({
                        name: 'Item for ' + strTime,
                        height: Math.max(50, Math.floor(Math.random() * 150))
                    });
                }
            }
        }
        //console.log(this.state.items);
        const newItems = {};
        Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
        this.setState({
            items: newItems
        });
        // }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
         console.log('____',this.state.item);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, { flexDirection: 'row' }]}>
                {/* <View style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}> */}
                <Image
                    source={{ uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/26168307_1832573663480180_5899833810848274293_n.jpg?_nc_cat=109&_nc_ht=scontent.fsgn5-6.fna&oh=fa469d9c20f13899bd5f8757b5b675e1&oe=5C84EE81' }}
                    style={{ width: 103, height: 103, borderRadius: 5, }} />
                <View style={{ width: width - 143, flexDirection: 'column' }}>
                    <Text
                        numberOfLines={2} style={{ fontSize: 13, fontWeight: '600', marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                        Tam khung Tam khung Tam khung Tam khung Tam khung Tam khung Tam khung Tam khung Tam khung Tam khung </Text>
                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20, left: 20, alignItems: 'center' }}>
                        <Image source={IC_CLOCK} />
                        <Text style={{ marginLeft: 10 }}>10 : 30</Text>
                        <Image source={IC_CALENDAR} style={{ marginLeft: 40 }} />
                        <Text style={{ marginLeft: 10 }}>{'( 01/09 - 05/09 )'}</Text>
                    </View>
                </View>


                {/* </View> */}
            </View >
        );
    }

    renderEmptyDate() {
        return null;
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        // padding: 10,
        // marginRight: 10,
        marginTop: 20,
        width: width - 40,
        marginHorizontal: 20
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});
