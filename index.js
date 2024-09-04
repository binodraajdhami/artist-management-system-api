require("dotenv/config");
const express = require("express");
const app = express();
const configs = require("./configs");
const morgan = require("morgan");
var cors = require("cors");

// Use Third-Party Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import API Routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

// Not-Found Middleware
app.use(function (req, res, next) {
	res.status(404).json({
		msg: "Invalid Route!",
	});
});

// Error Handling Middleware
app.use(function (err, req, res, next) {
	res.status(err.status || 400).json({
		status: err.status || 400,
		message: err.msg || err,
	});
});

app.listen(process.env.PORT || configs.app.port, function (err) {
	if (err) {
		console.log("Server listen failed!");
	} else {
		console.log(
			`Server listen at port : ${process.env.PORT || configs.app.port}`
		);
	}
});
