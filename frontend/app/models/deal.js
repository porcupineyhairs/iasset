import DS from 'ember-data';

var Deal = DS.Model.extend({
    dealCode: DS.attr('string'),
    dealType: DS.attr('string'),
    counterpartyName: DS.attr('string'),
    dealDate: DS.attr('string'),
    expiryDate: DS.attr('string'),
    ulSymbol: DS.attr('string'),
    ulName: DS.attr('string'),
    ulQuantity: DS.attr('number'),
    warningLevel: DS.attr('number'),
    dangerLevel: DS.attr('number'),
    nominalValue: DS.attr('number'),
    margin: DS.attr('number'),
});

Deal.reopenClass({
    FIXTURES: [
        {
            id: 'deal1',
            dealCode: 'deal-abc',
            dealType: '融资',
            ulSymbol: '000001.SZ',
            expiryDate: '2014-10-11',
            ulQuantity: 22222222,
            warningLevel: 0.75,
            dangerLevel: 0.6,
            margin: 20000,
            nominalValue: 100000,
        },
        {
            id: 'deal2',
            dealCode: 'deal-cde',
            dealType: '融券',
            ulSymbol: '600036.SH',
            expiryDate: '2014-11-11',
            ulQuantity: 3333333,
            warningLevel: 0.75,
            dangerLevel: 0.7,
            margin: 20000,
            nominalValue: 100000,
        },
    ]
});

export default Deal;
