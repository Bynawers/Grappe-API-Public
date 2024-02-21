const Wine = require("../models/wine");

exports.getWine = (req, res) => {
  Wine.findOne({ _id: req.params.id })
    .then((wine) => {
      res.status(200).json(wine);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
};

exports.getAllWines = (req, res) => {
  const pageNumber = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.size) || 10;
  const startIndex = pageNumber * limit;

  const query = {};

  const name = req.query.name;
  const type = req.query.type;
  const region = req.query.region;
  const country = req.query.country;
  const winery = req.query.winery;

  const year = parseInt(req.query.year);
  const yearMin = parseInt(req.query.yearMin);
  const yearMax = parseInt(req.query.yearMax);

  if (name) {
    query.name = new RegExp(name, "i");
  }
  if (region) {
    query.region = RegExp(region, "i");
  }
  if (winery) {
    query.winery = new RegExp(winery, "i");
  }
  if (!isNaN(year)) {
    query.year = year;
  }

  if (type) {
    const typeArray = type.split(",");
    const regexTypes = typeArray.map((type) => new RegExp(type, "i"));
    query.type = { $in: regexTypes };
  }
  if (country) {
    const countryArray = country.split(",");
    const regexCountries = countryArray.map(
      (country) => new RegExp(country, "i")
    );
    query.country = { $in: regexCountries };
  }
  if (!isNaN(yearMin) && !isNaN(yearMax)) {
    query.year = { $gte: yearMin, $lte: yearMax };
  } else if (!isNaN(yearMin)) {
    query.year = { $gte: yearMin };
  } else if (!isNaN(yearMax)) {
    query.year = { $lte: yearMax };
  }

  Wine.countDocuments(query)
    .then((count) => {
      Wine.find(query)
        .sort("_id")
        .skip(startIndex)
        .limit(limit)
        .then((wines) => {
          res.set("X-Total-Count", count);
          res.status(200).json(wines);
        })
        .catch((error) => res.status(404).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.createWine = (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "empty body" });
  }

  delete req.body._id;

  const wine = new Wine({
    name: req.body.name,
    country: req.body.country,
    region: req.body.region,
    winery: req.body.winery,
    volume: req.body.volume,
    year: req.body.year,
    type: req.body.type,
    verified: req.body.verified,
    natural: req.body.natural,
    grape: req.body.grape,
    rating: req.body.rating,
    temperature_service: req.body.temperature_service,
    characteristics: req.body.characteristics,
    taste: req.body.taste,
    image: `${req.protocol}://${req.get("host")}/images/${req.body.name}_${req.body.year}_${req.body.winery}.png`,
  });

  wine
    .save()
    .then(() => res.status(201).json({ message: "Wine saved successfully!" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.updateWine = (req, res) => {
  const wineObject = req.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };

  Wine.updateOne({ _id: req.params.id }, { ...wineObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié!" }))
    .catch((error) => res.status(401).json({ error }));
};

exports.deleteWine = (req, res) => {
  Wine.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Wine deleted successfully!" }))
    .catch((error) => res.status(400).json({ error }));
};
