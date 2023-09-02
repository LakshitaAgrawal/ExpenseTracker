const model = require("../models/model");

// post: http://localhost:8000/api/categories
async function create_categories(req, res) {
  const Create = new model.Categories({
    type: "Investment",
    color: "#FCBE44",
  });

  await Create.save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: `Error while creating categories: ${err.message}` });
    });
}

// get: http://localhost:8000/api/categories
async function get_Categories(req, res) {
  let data = await model.Categories.find({});

  // to get only type and color
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
}

// post: http://localhost:8000/api/transaction
async function create_Transaction(req, res) {
  // get data from user
  if (!req.body) return res.status(400).json("Post Http data not provided");
  let { name, type, amount } = req.body;

  const create = await new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });

  // create.save(function(err){
  //     if(!err) return res.json(create);
  //     return res.status(400).json({message: `Error while creating transaction ${err}`});
  // })

  await create
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: `Error while creating categories: ${err.message}` });
    });
}

// get: http://localhost:8000/api/transaction
async function get_Transaction(req, res) {
  let Data = await model.Transaction.find({});
  return res.json(Data);
}

// delete: http://localhost:8000/api/transaction
// async function delete_Transaction(req,res){
//     if(!req.body) res.status(400).json({message: "Request body not found"});
//     await model.Transaction.deleteOne(req.body, function(err) {
//         if(!err) res.json("Record deleted");
//     }).clone().catch(function(err){res.json("Error while deleting Transaction record")});
// }

async function delete_Transaction(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body not found" });
    }

    await model.Transaction.deleteOne(req.body);
    res.json("Record deleted");
  } catch (err) {
    res.json("Error while deleting Transaction record");
  }
}

// get: http://localhost:8000/api/labels
// async function get_Labels(req, res) {
//   model.Transaction.aggregate([
//     {
//       $lookup: {
//         from: "categories",
//         localField: "type",
//         foreignField: "type",
//         as: "categories_info",
//       },
//     },
//     {
//       $unwind: "$categories_info",
//     },
//   ])
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       res.status(400).json("Lookup collection error");
//     });
// }

async function get_Labels(req, res) {
  try {
    const result = await model.Transaction.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "categories_info",
        },
      },
      {
        $unwind: "$categories_info",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          type: { $first: "$type" },
          amount: { $first: "$amount" },
          color: { $first: "$categories_info.color" },
          // Include other fields from the Transaction collection if needed
        },
      },
    ]);
    // let data = result.map(v => Object.assign({}, {_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
    res.json(result);
  } catch (error) {
    res.status(400).json("Lookup collection error");
  }
}

module.exports = {
  create_categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
};
