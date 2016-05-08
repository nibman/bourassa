var priceListURL;


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
          var url = object.get("url");
          console.log("PriceList fetched "+url);
          priceListURL = url;
          Parse.Cloud.httpRequest({ url:url }).then(function(response)
          {
              // The file contents are in response.buffer.
            parsePriceList(response.buffer.toString());

          });
        },
        error: function(object, error) {
          // error is an instance of Parse.Error.
          console.log(error);
        }
      });
})



function parsePriceList(priceListString)
{
  var json = JSON.parse(priceListString);
  var pricesArray = json.priceList;
  for (var i=0; i<pricesArray.length; ++i)
  {
    console.log(pricesArray[i]);
  }
}