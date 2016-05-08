
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.afterSave("PriceList", function(request)
{
  console.log("PriceList was saved");
  console.log(request.object.id);

  var PriceList = Parse.Object.extend("PriceList");
  query = new Parse.Query(PriceList);

  query.get(request.object.id,
      {
        success: function(object) {
          console.log("PriceList fetched "+object);
          console.log(object.toString());
        },
        error: function(object, error) {
          // error is an instance of Parse.Error.
          console.log(error);
        }
      });
})