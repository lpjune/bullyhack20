var Block = require("../models/block");
var app = require("../app.js");

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

var async = require("async");
const BlockChain = require("../blockchain/blockChain");

exports.index = function(req, res) {
  async.parallel(
    {
      block_count: function(callback) {
        Block.count(callback);
      }
    },
    function(err, results) {
      res.render("index", {
        hash: "Local Library Home",
        error: err,
        data: results
      });
    }
  );
};

// Display list of all blocks sorted by hash.
exports.block_list = function(req, res, next) {
  Block.find({})
    .sort({ index: "asc" })
    .exec(function(err, list_blocks) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("block_list", { hash: "Block List", block_list: list_blocks });
    });
};

// Display list of all blocks sorted by date.
exports.block_list_date = function(req, res, next) {
  Block.find({})
    .sort({ date: "desc" })
    .exec(function(err, list_blocks) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("block_list", { hash: "Block List", block_list: list_blocks });
    });
};

// Display list of all blocks sorted by last name.
exports.block_list_name = function(req, res, next) {
  Block.find({}).exec(function(err, list_blocks) {
    if (err) {
      return next(err);
    }
    list_blocks.sort(function(a, b) {
      let textA = a.lastName.toUpperCase();
      let textB = b.lastName.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    // Successful, so render
    res.render("block_list", { hash: "Block List", block_list: list_blocks });
  });
};

// Display list of all blocks sorted by cost.
exports.block_list_cost = function(req, res, next) {
  Block.find({})
    .sort({ cost: "asc" })
    .collation({ locale: "en_US", numericOrdering: true })
    .exec(function(err, list_blocks) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("block_list", { hash: "Block List", block_list: list_blocks });
    });
};

// Display list of all blocks sorted by index.
exports.block_list_index = function(req, res, next) {
  Block.find({})
    .sort({ index: "asc" })
    .collation({ locale: "en_US", numericOrdering: true })
    .exec(function(err, list_blocks) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("block_list", { hash: "Block List", block_list: list_blocks });
    });
};

// Display list of all blocks matching search.
exports.block_list_search = function(req, res, next) {
  let query = req.body.search_term;
  console.log(query);
  if (typeof query === "undefined") {
    res()
      .status(400)
      .json({ error: "missing parameter search_term", data: null }); // Only an  example
    return;
  }
  Block.find({ $text: { $search: query } }).exec(function(err, list_blocks) {
    if (err) {
      res.render("block_list", { hash: "Block List", block_list: list_blocks });
    }
    // Successful, so render
    res.render("search", { hash: "Block List", block_list: list_blocks });
  });
};

// Display detail page for a specific block.
exports.block_detail = function(req, res, next) {
  async.parallel(
    {
      block: function(callback) {
        Block.findById(req.params.id).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.block == null) {
        // No results.
        var err = new Error("Block not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("block_detail", { hash: "Hash", block: results.block });
    }
  );
};

// Display block create form on GET.
exports.block_create_get = function(req, res, next) {
  async.parallel({}, function(err, results) {
    if (err) {
      return next(err);
    }
    res.render("block_form", { hash: "Create Block" });
  });
};

// Handle block create on POST.
exports.block_create_post = [
  // Validate fields.
  body("cost", "Cost must be a number")
    .isLength({ min: 1 })
    .isFloat()
    .trim(),
  body("firstName", "First name must be letters only")
    .isLength({ min: 1 })
    .isAlpha()
    .trim(),
  body("lastName", "Last name must be letters only")
    .isLength({ min: 1 })
    .isAlpha()
    .trim(),
  body("date", "Date must be MM-DD-YYYY")
    .isLength({ min: 1 })
    .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-([0-9]{4})$/)
    .trim(),

  // Sanitize fields.
  sanitizeBody("*").escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      async.parallel({}, function(err, results) {
        if (err) {
          return next(err);
        }

        var block = new Block();
        block.firstName = req.body.firstName;
        block.lastName = req.body.lastName;
        block.cost = req.body.cost;
        block.date = req.body.date;

        res.render("block_form", {
          hash: "Create Block",
          block: block,
          errors: errors.array()
        });
      });

      return;
    } else {
      // Block.find({}).then(blocks => {
      //   for (i = 0; i <= blocks.length - 1; i++) {
      //     block_chain.chain.push(blocks[i]);
      //   }
      // });
      if (block_chain.isEmpty()) {
        block_chain.addNewBlock(
          null,
          req.body.firstName,
          req.body.lastName,
          req.body.cost,
          req.body.date
        );
      } else {
        block_chain.addNewBlock(
          block_chain.lastBlock().hash,
          req.body.firstName,
          req.body.lastName,
          req.body.cost,
          req.body.date
        );
      }

      // Successful - save new block, redirect to new block record.
      res.redirect("/catalog");
    }
  }
];

// Display block delete form on GET.
exports.block_delete_get = function(req, res, next) {
  async.parallel(
    {
      block: function(callback) {
        Block.findById(req.params.id).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.block == null) {
        // No results.
        res.redirect("/catalog/blocks");
      }
      // Successful, so render.
      res.render("block_delete", {
        hash: "Delete Block",
        block: results.block
      });
    }
  );
};

// Handle block delete on POST.
exports.block_delete_post = function(req, res, next) {
  // gets correct ID
  Block.findOne({ _id: req.body.id })
  .exec(function(err, block) {
    if (err) {
      return next(err);
    }
    block.hidden = true;
    block.save(err => console.log(err));
  })
  res.redirect("/");
};

// Display block update form on GET.
exports.block_update_get = function(req, res, next) {
  // Get block for form
  async.parallel(
    {
      block: function(callback) {
        Block.findById(req.params.id).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.block == null) {
        // No results.
        var err = new Error("Block not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("block_form", { hash: "Update Block", block: results.block });
    }
  );
};

// Handle block update on POST.
exports.block_update_post = [
  // Validate fields.
  body("cost", "Cost must be a number")
    .isLength({ min: 1 })
    .isFloat()
    .trim(),
  body("firstName", "First name must be letters only")
    .isLength({ min: 1 })
    .isAlpha()
    .trim(),
  body("lastName", "Last name must be letters only")
    .isLength({ min: 1 })
    .isAlpha()
    .trim(),
  body("date", "Date must be MM-DD-YYYY")
    .isLength({ min: 1 })
    .matches(/^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-([0-9]{4})$/)
    .trim(),

  // Sanitize fields.
  sanitizeBody("cost").escape(),
  sanitizeBody("firstName").escape(),
  sanitizeBody("lastName").escape(),
  sanitizeBody("date").escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Block object with escaped/trimmed data and old id.
    var block = new Block({
      _id: req.params.id,
      cost: req.body.cost,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      date: req.body.date
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      async.parallel({}, function(err, results) {
        if (err) {
          return next(err);
        }

        res.render("block_form", {
          hash: "Update Block",
          block: block,
          errors: errors.array()
        });
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      Block.findByIdAndUpdate(req.params.id, block, {}, function(
        err,
        theblock
      ) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to block detail page.
        res.redirect(block.url);
      });
    }
  }
];
