function ClientsViewModel() {
    var self = this;

    self.Clients = ko.observableArray();

    /// get data
    //
    self.Clients = ko.mapping.fromJS(data);

    // var postData = ko.toJSON(self.Clients)
    //

    self.addItem = function() {
    };

    self.removeItem = function() {
    };

    self.changeItem = function() {
    };
}

function AddClientViewModel() {
    var self = this;
}

function EditClientViewModel() {

}

