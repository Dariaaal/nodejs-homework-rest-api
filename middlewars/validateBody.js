const { HttpError } = require("../helpers");

const validateBody = schema => {
	const func = (req, res, next) => {
		if (!req.body || Object.keys(req.body).length === 0) {
			next(HttpError(400, "missing fields"));
		}
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next(error);
	}
	return func;
}

module.exports = validateBody;