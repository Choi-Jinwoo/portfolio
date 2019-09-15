module.exports = (sequelize, DataTypes) => {
	const File = sequelize.define('File', {
		id : {
			field : 'id',
			type : DataTypes.INTEGER(45),
			primaryKey : true,
			autoIncrement : true,
			allowNull : false,
		},
		file_name : {
			field : 'file_name',
			type : DataTypes.STRING(1000),
			allowNull : false,
		},
		event_id : {
			field : 'event_id',
			type : DataTypes.INTEGER(45),
			allowNull : false,
		}
	})

	File.associate = (models) => {
		models.File.belongsTo(models.Event, {
				foreignKey : "event_id"
		})
	}

	File.createFile = (data) => File.create({
		file_name : data.file_name,
		event_id : data.event_id,
	})

	File.getFilesByEventId = (event_id) => File.findAll({
		where : { event_id },
		raw : true,
	})

	File.getFile = (id) => File.findOne({
		where : { id },
		raw : true,
	})
	return File;
}