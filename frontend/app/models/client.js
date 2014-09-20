import DS from 'ember-data';

var Client = DS.Model.extend({
    name: DS.attr('string'),
    address: DS.attr('string'),
    phone: DS.attr('string'),
    email: DS.attr('string'),
});

Client.reopenClass({
    FIXTURES: [
        {
            id: 'random',
            name: "Ralph Zhang",
            address: "广东省深圳市金田路4036号",
            phone: "+86 18682285308",
            email: "ralph.j.zhang@gmail.com",
        },
        {
            id: '2',
            name: "Sarah Lee",
            address: "Checkout some more ember stuff",
            phone: "111",
        },
        {
            id: '3',
            name: "Bin Laden",
            address: "Checkout some more ember stuff",
            phone: "111",
        }
    ]
});

export default Client;
