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

export default class {
    static mapItemHome(name) {
        let icon;
        switch (name) {
            case 'Pages.Resident':
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
            case 'e-libary':
                icon = Elibary
                break;
            case 'deliveries':
                icon = Delivery
                break;
            case 'Pages.Resident.FrontDesk':
                icon = Frontdesk
                break;
            default:
                icon = Elibary
                break;
        }
        return icon;
    }
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