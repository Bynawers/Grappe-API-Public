const User = require("../models/user");
const access = require("../db/access.json");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "User created !" }))

    .catch((error) => res.status(400).json({ error }));
};

exports.login = (req, res) => {
  try {
    if (
      typeof req.body.email !== "string" ||
      typeof req.body.password !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Email and password must be strings" });
    }

    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ message: "Password or email incorrect" });
        }
        if (req.body.password !== user.password) {
          return res
            .status(401)
            .json({ message: "Password or email incorrect" });
        }

        return res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            {
              userId: user._id,
            },
            access.encryptToken,
            { expiresIn: "24h" }
          ),
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
