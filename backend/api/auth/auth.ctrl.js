const tokenLib = require('../../lib/token');
const colorConsole = require('../../lib/console');
const models = require('../../models');
const Validation = require('../../lib/validation');

exports.login = async (req, res) => {
	colorConsole.green('[AUTH] 로그인');
	const { user_id, user_pw } = req.body
	
	colorConsole.gray('<request>');
	colorConsole.gray({ user_id });

	if (!(user_id && user_pw)) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	const user = await models.User.getUserForLogin(user_id, user_pw);
	
	colorConsole.green({ user });

	if (!user) {
		colorConsole.yellow('[AUTH] 일치하는 회원 정보가 없습니다.');
		return res.status(401).json({ status : 401, message : '일치하는 회원 정보가 없습니다.' });
	}

	const token = tokenLib.createToken(user_id);

	return res.status(200).json({ status : 200, message : '로그인에 성공하였습니다.', data : { token } });
}

exports.signUp = async (req, res) => {
	colorConsole.green('[AUTH] 회원가입');
	const { body } = req;
	try {
		await Validation.validateSingUp(body);
	} catch(err) {
		colorConsole.yellow('검증 오류입니다.');
		return res.status(400).json({ status : 400, message : '검증 오류입니다.' });
	}

	try {
		if (await models.User.getUser(body.user_id)) {
			colorConsole.yellow('[AUTH] 이미 존재하는 아이디입니다.')
			return res.status(400).json({ status : 400, message : '이미 존재하는 아이디입니다.' });
		}

		await models.User.createUser(body);
		return res.status(200).json({ status : 200, message : '회원가입에 성공하였습니다.' });
	} catch(err) {
		colorConsole.red(err.message);
		return res.status(500).json({ status : 500, message : '회원가입에 실패하였습니다.' });
	}
}