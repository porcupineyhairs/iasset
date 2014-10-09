import DS from 'ember-data';

var Deal = DS.Model.extend({
    dealCode: DS.attr('string'),
    counterpartyName: DS.attr('string'),
    dealDate: DS.attr('date'),
    expiryDate: DS.attr('date'),
    ulSymbol: DS.attr('string'),
    ulName: DS.attr('string'),
    ulQuantity: DS.attr('number'),
    warningLevel: DS.attr('number'),
    dangerLevel: DS.attr('number'),
});

Deal.reopenClass({
    FIXTURES: [
        {
            id: 'deal1',
            dealCode: 'deal-abc',
            ulSymbol: '000001.SZ',
            ulQuantity: 22222222,
            warningLevel: 0.75,
            dangerLevel: 0.7,
        },
        {
            id: 'deal2',
            dealCode: 'deal-cde',
            ulSymbol: '600036.SH',
            ulQuantity: 3333333,
            warningLevel: 0.75,
            dangerLevel: 0.7,
        },
    ]
});

export default Deal;
