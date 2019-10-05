const colorConsole = require("../../lib/console");
const models = require("../../models");
const fs = require("fs");

exports.uploadFile = (req, res) => {
  const { event_id } = req.query;

  colorConsole.green("[FILE] 파일 업로드");

  colorConsole.gray("<request>");
  colorConsole.gray({ event_id });

  if (!event_id) {
    colorConsole.yellow("검증 오류입니다.");
    return res.status(400).json({ status: 400, message: "검증 오류입니다." });
  }

  try {
    req.files.forEach(async file => {
      await models.File.createFile({ file_name: file.filename, event_id });
    });

    return res
      .status(200)
      .json({ status: 200, message: "파일 업로드에 성공하였습니다." });
  } catch (err) {
    colorConsole.red(err.message);
    return res
      .status(500)
      .json({ status: 500, message: "파일 업로드에 실패하였습니다." });
  }
};

exports.downloadFile = async (req, res) => {
  const { file_id } = req.query;

  colorConsole.green("[FILE] 파일 다운로드");
  colorConsole.gray("<request>");
  colorConsole.gray({ file_id });

  try {
    const fileInfo = await models.File.getFile(file_id);
    const file_name = fileInfo.file_name;
    const file = __dirname + "../../../public/" + file_name;

    fs.readFile(file, (err, data) => {
      if (err) {
        colorConsole.red(err.message);
        return res
          .status(500)
          .json({ status: 500, message: "파일 다운로드에 실패하였습니다." });
      }

      return res.send(data);
    });
  } catch (err) {
    colorConsole.red(err.message);
    return res
      .status(500)
      .json({ status: 500, message: "파일 다운로드에 실패하였습니다." });
  }
};
