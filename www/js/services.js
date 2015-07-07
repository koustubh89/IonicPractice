angular.module('starter.services', [])

.factory('Chats', function(Data) {
  // Might use a resource here that returns a JSON array
  var chats = [];
  Data.get('chat', 'get', false).then(function(result){
    var chats = result;  
  });

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Data',["$http", "$injector", "$q", function($http, $injector, $q){
  return{
    get : function(methodname, type, server, parameters){
      var q = $injector.get("$q");
      var deferred = $q.defer();
      var method = 'GET';
      var params = {};
      if (type == 'post') {
          method = 'POST';
          params = parameters;
      }
      if (server) {
        var url = "contextPath" + methodname;
      } else {
        var url = 'json/' + methodname + ".json";
      }
      
      $http({
          method: method,
          url: url,
          params: params
      }).success(function(data, status, headers, config) {
        if (data.status == 'OK') {
          deferred.resolve(data.response);
        } else {
          if (data.error != undefined) {
            console.error("error: ", data.message);
          } else {
            deferred.reject(data);
          }
        }
      }).error(function() {
        console.log("error block")
      });
      return deferred.promise;
    }
  }
}]);
