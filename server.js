var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop', { useNewUrlParser: true, useUnifiedTopology: true });

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/product', function(req, res) {
  var product = new Product(req.body);
  product.save(function(err, savedProduct) {
    if (err) {
      res.status(500).send({error:"Could not save product"});
    }
    else {
      res.status(200).send(savedProduct);
    }
  });
});

app.get('/product', function(req, res) {
  Product.find({}, function(err, products) {
    if (err) {
      res.status(500).send({error: "Could not fetch products"});
    }
    else {
      res.send(products);
    }
  });
});

app.listen(3000, function() {
  console.log("Swag Shop API running on port 3000");
})
