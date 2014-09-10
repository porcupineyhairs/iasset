$ = require 'jquery'
config = require './config'

getAll = (collection) ->
    keys_url = config.webdis("KEYS", collection)
    $.ajax keys_url,
        type: 'GET'
        dataType: 'json'
        success: (data, textStatus, jqXHR) ->
            # $('body').append "Successful AJAX call: #{data}"
            console.log "Successful AJAX call: #{data}"
            
root = exports ? window
root.getAll = getAll
