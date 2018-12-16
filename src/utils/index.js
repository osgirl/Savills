'use strict';


import Events from "@resources/icons/Events.png";
import Booking from "@resources/icons/Booking.png";
import Workorder from "@resources/icons/Workorder.png";
import Invoice from "@resources/icons/Invoice.png";
import Inbox from "@resources/icons/inbox.png";
import Feedback from "@resources/icons/Feedback.png";
import Elibary from "@resources/icons/Elibary.png";
import Delivery from "@resources/icons/delivery.png";
import Frontdesk from "@resources/icons/Frontdesk.png";
import Fee from "../resources/icons/Fee.png";
import FAQ from "../resources/icons/FAQ.png";
import Contacts from "../resources/icons/contacts.png";


// * Circle
import Circle_Events from "../resources/icons/Circle-Events.png";
import Circle_Booking from "../resources/icons/Circle-Booking.png";
import Circle_Workorder from "../resources/icons/Circle-Workorder.png";
import Circle_Invoice from "../resources/icons/Circle-Invoice.png";
import Circle_inbox from "../resources/icons/Circle-inbox.png";
import Circle_Feedback from "../resources/icons/Circle-Feedback.png";
import Circle_E_libary from "../resources/icons/Circle-E-libary.png";
import Circle_delivery from "../resources/icons/Circle-delivery.png";
import Circle_Frontdesk from "../resources/icons/Circle-Frontdesk.png";
import Circle_Contacts from "../resources/icons/Circle-Contacts.png";
import Circle_FAQ from "../resources/icons/Circle-FAQ.png";

export default class {


    static convertNumber(x) {
        if (x == undefined) {
            x = 0;
        }
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    static mapItemHome(name) {
        let icon;
        switch (name) {
            case 'Pages.CalendarEvents':
                icon = Events
                break;
            case 'Pages.Resident.Booking':
                icon = Booking
                break;
            case 'Pages.Resident.WorkOrder':
                icon = Workorder
                break;
            case 'Pages.Resident.Invoice':
                icon = Invoice
                break;
            case 'Pages.Resident.Inbox':
                icon = Inbox
                break;
            case 'Pages.Resident.Feedback':
                icon = Feedback
                break;
            case 'Pages.Libraries':
                icon = Elibary
                break;
            case 'deliveries':
                icon = Delivery
                break;
            case 'Pages.Resident.Fee':
                icon = Fee
                break;
            case 'Pages.FAQ':
                icon = FAQ
                break;
            case 'Pages.Resident.FrontDesk':
                icon = Frontdesk
                break;
            case 'Pages.Resident.Contacts':
                icon = Contacts
                break;
            default:
                break;
        }
        return icon;
    }


    static mapItemHomeCircle(name) {
        let icon;
        switch (name) {
            case 'Pages.CalendarEvents':
                icon = Circle_Events
                break;
            case 'Pages.Resident.Booking':
                icon = Circle_Booking
                break;
            case 'Pages.Resident.WorkOrder':
                icon = Circle_Workorder
                break;
            case 'Pages.Resident.Invoice':
                icon = Circle_Invoice
                break;
            case 'Pages.Resident.Inbox':
                icon = Circle_inbox
                break;
            case 'Pages.Resident.Feedback':
                icon = Circle_Feedback
                break;
            case 'Pages.Libraries':
                icon = Circle_E_libary
                break;
            case 'deliveries':
                icon = Circle_delivery
                break;
            case 'Pages.Resident.FrontDesk':
                icon = Circle_Frontdesk
                break;
            case 'Pages.Resident.Contacts':
                icon = Circle_Contacts
                break;
            case 'Pages.FAQ':
                icon = Circle_FAQ
                break;
            case 'Pages.Resident.Fee':
                icon = Circle_Invoice
                break;

            default:
                icon = Elibary
                break;
        }
        return icon;
    }

    static dataPlaceholder = [
        {
            id: 1,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            id: 2,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            id: 3,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            id: 4,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            id: 5,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            id: 6,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            id: 7,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            id: 8,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            id: 9,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
    ]

    static dataPlaceholderEvents = [
        {
            eventId: 112321,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            eventId: 21231213123,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            eventId: 621122121,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            eventId: 7123123121,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
    ]

    static dataPlaceholderFeedback = [
        {
            commentBoxId: 112321,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            commentBoxId: 21231213123,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            commentBoxId: 621122121,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
        {
            commentBoxId: 7123123121,
            title: "####",
            image: require('@resources/icons/Events.png'),
        },
    ]
}


// let DATA = [
//     { id: 1, key: 'Pages.Resident', title: 'Events' },
//     { id: 2, key: 'Pages.Resident.Booking', title: 'Booking' },
//     { id: 3, key: 'Pages.Resident.WorkOrder', title: 'Work Order' },
//     { id: 4, key: 'invoice', title: 'Invoice' },
//     { id: 5, key: 'Pages.Resident.Inbox', title: 'Inbox' },
//     { id: 6, key: 'Pages.Resident.Feedback', title: 'Feed back' },
//     { id: 7, key: 'e-libary', title: 'E-labary' },
//     { id: 8, key: 'Pages.Resident.Contacts', title: 'Contacts' },
//     { id: 9, key: 'Pages.Resident.FrontDesk', title: 'Frontdesk' },
//     { id: 10, key: 'Pages.Resident.Fee', title: 'Free' },
// ]