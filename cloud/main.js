var priceListURL;


Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

Parse.Cloud.afterSave("PriceList", function(request)
{
  console.log("PriceList was saved");
  console.log(request.object.id);

  var PriceList = Parse.Object.extend("PriceList");
  var query = new Parse.Query(PriceList);

  query.get(request.object.id,
      {
        success: function(object) {
          var url = object.get("url");
          console.log("PriceList fetched "+url);
          priceListURL = url;
          Parse.Cloud.httpRequest({ url:url }).then(function(response)
          {
            parsePriceList(response.buffer.toString());

          });
        },
        error: function(object, error)
        {
          console.log(error);
        }
      });
})



function parsePriceList(priceListString)
{
  var json = JSON.parse(priceListString);
  var pricesArray = json.priceList;

  pricesArray.forEach(function(item))
  {
    var Product = Parse.Object.extends("Product");
    query.equalTo("numeroProduit", item.id);
    query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length + " products");
        // Do something with the returned Parse.Object values
        if (results.length <= 0)
        {
          var ProductA = Parse.Object.extend("Product");
          var product = new ProductA();
          product.set("id", item.id);
          product.set("ids", items.ids);
          product.set("units", items.units);
          product.set("prices", items.prices);
          product.set("descriptions", items.descriptions);
          product.save();
        }
        else
        {

        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }

}