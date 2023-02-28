// import express
const express = require("express");
// import router
const router = express.Router();
// import functions from controller
const { getAllToilets } = require("../controllers/toilets-tbl");

// GETS all toilets
router.get("/getall", getAllToilets);

module.exports = router;
