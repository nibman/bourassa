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
  // console.log(pricesArray);
  var Product = Parse.Object.extends("Product");

  var productsArray = [];



  pricesArray.forEach(function(item)
    {
      console.log(item);
      var product = new Product();
      product.set("productId", item.id);
      product.set("ids", items.ids);
      product.set("units", items.units);
      product.set("prices", items.prices);
      product.set("descriptions", items.descriptions);
      productsArray.push(product);

    });

  Parse.Object.saveAll(productsArray,
      {
        success: function(objs)
        {
          console.log("Saved all objects ");
          console.log(objs);
        },
        error: function(error)
        {
          console.log(error);
        }
      });
}