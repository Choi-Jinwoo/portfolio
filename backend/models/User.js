module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		user_id : {
			field : 'user_id',
			type : DataTypes.STRING(45),
			primaryKey : true,
			autoIncrement : false,
			allowNull : false,
		},
		user_pw : {
			field : 'user_pw',
			type : DataTypes.STRING(500),
			allowNull : false,
		},
		name : {
			field : 'name',
			type : DataTypes.STRING(45),
			allowNull : false,
		}
	})

	User.associate = (models) => { //User.user_id => Event.user_id
		models.User.hasMany(models.Event, {
			foreignKey : "user_id",
		})
	}

	User.getUser = (user_id) => User.findOne({ where : { user_id }, raw : true });
	
	User.createUser = (data) => User.create({
		user_id : data.user_id,
		user_pw : data.user_pw,
		name : data.name,
	});

	User.getUserForLogin = (user_id ,user_pw) => User.findOne({
		attributes : [
			'user_id',
			'name',
		],
		where : {
			user_id,
			user_pw,
		},
		raw : true,
	});
	
	return User;
}