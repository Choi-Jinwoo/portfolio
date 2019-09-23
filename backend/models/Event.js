module.exports = (sequelize, DataTypes) => {
	const Event = sequelize.define('Event', {
		id : {
			field : 'id',
			type : DataTypes.INTEGER(45),
			primaryKey : true,
			autoIncrement : true,
			allowNull : false,
		},
		title : {
			field : 'title',
			type : DataTypes.STRING(45),
			allowNull : false,
		},
		content : {
			field : 'content',
			type : DataTypes.STRING(5000),
			allowNull : false,
		},
		start_date : {
			field : 'start_date',
			type : DataTypes.DATEONLY,
			allowNull : false,
		},
		end_date : {
			field : 'end_date',
			type : DataTypes.DATEONLY,
			allowNull : false,
		},
		user_id : {
			field : 'user_id',
			type : DataTypes.STRING(45),
			allowNull : false,
		}
	})

	Event.associate = (models) => { //Event.id => File.event_id
		models.Event.hasMany(models.File, {
			foreignKey : "event_id"
		})
	}

	Event.associate = (models) => {
		models.Event.belongsTo(models.User, {
				foreignKey : "user_id"
		})
	}

	Event.getEvent = (id) => Event.findOne({ where : { id }, raw : true });
	
	Event.getEventsByUser = (user_id) => Event.findAll({ where : { user_id }, raw :true });
	
	Event.createEvent = (data) => Event.create({
		title : data.title,
		content : data.content,
		start_date : data.start_date,
		end_date : data.end_date,
		user_id : data.user_id,
	});

	Event.deleteEvent = (id) => Event.destroy({ where : { id } });

	Event.updateEvent = (id, data) => Event.update(data, { where : id });
	
	Event.deleteEvent = (id) => Event.destroy({ where : { id } });
	
	return Event;
}