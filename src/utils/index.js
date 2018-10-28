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
            case 'events':
                icon = Events
                break;
            case 'booking':
                icon = Booking
                break;
            case 'workorder':
                icon = Workorder
                break;
            case 'invoice':
                icon = Invoice
                break;
            case 'inbox':
                icon = Inbox
                break;
            case 'feedback':
                icon = Feedback
                break;
            case 'e-libary':
                icon = Elibary
                break;
            case 'deliveries':
                icon = Delivery
                break;
            case 'frontdesk':
                icon = Frontdesk
                break;
            default:
                break;
        }
        return icon;
    }
}
