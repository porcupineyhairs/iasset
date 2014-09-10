chai = require 'chai'
chai.should()

{ClientsViewModel} = require '../src/client'

describe 'ClientsViewModel', ->
    c = new ClientsViewModel
    it 'should have nothing', ->
        c.should.equal {}