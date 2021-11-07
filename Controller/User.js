const User = require("../Models/User");
const excelJS = require("exceljs");

const exportUser = async (req, res) => {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("My Users");
  const path = "./files";

  worksheet.columns = [
    { header: "S no.", key: "s_no", width: 10 },
    { header: "First Name", key: "fname", width: 10 },
    { header: "Last Name", key: "lname", width: 10 },
    { header: "Email Id", key: "email", width: 10 },
    { header: "Gender", key: "gender", width: 10 },
  ];

  let counter = 1;

  User.forEach((user) => {
    user.s_no = counter;
    worksheet.addRow(user);
    counter++;
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workbook.xlsx.writeFile(`${path}/users.xlsx`).then(() => {
      res.send({
        status: req.t("success"),
        message: req.t("downloadSuccess"),
        path: `${path}/users.xlsx`,
      });
    });
  } catch (err) {
    res.send({
      status: req.t("error"),
      message: req.t("somethingWentWrong"),
    });
  }
};

module.exports = exportUser;
