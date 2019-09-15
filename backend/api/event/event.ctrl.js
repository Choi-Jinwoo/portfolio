const models = require('../../models');
const colorConsole = require('../../lib/console');
const Validation = require('../../lib/validation');

exports.addEvent = async (req, res) => {
	colorConsole.green('[EVENT] 이벤트 추가');
	const { body } = req;
	body.user_id = req.user.user_id;
	
	colorConsole.gray('<request>');
	colorConsole.gray(body)
	
	try {
		await Validation.validateAddEvent(body);
	} catch(err) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}
	
	try {
		const createdEvent = await models.Event.createEvent(body);
		
		colorConsole.gray('<response>');
		colorConsole.gray({ event_id : createdEvent.id });
		return res.status(200).json({ status : 200, message : '이벤트 추가에 성공하였습니다.', data : { event_id : createdEvent.id} });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '이벤트 추가에 실패하였습니다.' });
	}
}

exports.getEvents = async (req, res) => {
	colorConsole.green('[EVENT] 이벤트 조회');
	const { event_id } = req.query;

	if (event_id) {
		const event = await models.Event.getEvent(event_id);
		if (!event) {
			colorConsole.yellow('[EVENT] 이벤트가 존재하지 않습니다.');
			return res.status(400).json({ status : 400, message : '이벤트가 존재하지 않습니다.' });
		}
		event.files = await models.File.getFilesByEventId(event_id);
		return res.status(200).json({ status : 200, message : '이벤트 조회에 성공하였습니다.', data : { event } });
	}

	try {
		const events = await models.Event.getEventsByUser(req.user.user_id);
		
		if (!events.length) {
			colorConsole.yellow('[EVENT] 이벤트가 존재하지 않습니다.');
			return res.status(400).json({ status : 400, message : '이벤트가 존재하지 않습니다.' });
		}

		for (let i = 0 ; i < events.length; i++) {
			events[i].files = await models.File.getFilesByEventId(events[i].id);
		}
		events.reverse();
		return res.status(200).json({ status : 200, message : '이벤트 조회에 성공하였습니다.', data : { events } });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '이벤트 조회에 실패하였습니다.' });
	}
}