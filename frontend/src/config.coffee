
webdis = (args...) ->
    "http://trust-blitz.codio.io:7379/" + args.join('/')
    
root = exports ? window
root.webdis = webdis