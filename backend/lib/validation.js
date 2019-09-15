const Joi = require('@hapi/joi')
	.extend(require('@hapi/joi-date'));

exports.validateSingUp = async (body) => {
	const schema = Joi.object().keys({
		user_id : Joi.string().required(),
		user_pw : Joi.string().required(),
		name : Joi.string().required(),
	});

	const result = schema.validate(body);
	
	if (result.error) {
		throw result.error;
	}
	
	return schema.validate(body);
}

exports.validateAddEvent = async (body) => {
	const schema = Joi.object().keys({
		title : Joi.string().required(),
		content : Joi.string().required(),
		start_date : Joi.date().format('YYYY-MM-DD').required(),
		end_date : Joi.date().format('YYYY-MM-DD').required(),
		user_id : Joi.string().required(),
	});

	const result = schema.validate(body);

	if (result.error) {
		throw result.error;
	}

	return schema.validate(body);
}