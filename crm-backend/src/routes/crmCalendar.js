// emailRoutes.js

const express = require("express");
const router = express.Router();

const verifyToken = require("../utilities/verifyToken"); // Update the import statement

// const { verifyToken } = require("../utilities/verifyToken");
const { saveCrmCalendarData } = require("../controller/crmCalendar");
const { getCrmCalendarData } = require("../controller/crmCalendar");
const { updateCrmCalendarData } = require("../controller/crmCalendar");
const { deleteCrmCalendarData } = require("../controller/crmCalendar");

router.get("/get-crm-calendar-data", verifyToken, getCrmCalendarData);
router.post("/save-crm-calendar-data", verifyToken, saveCrmCalendarData);
router.put("/update-crm-calendar-data", verifyToken, updateCrmCalendarData);
router.delete("/delete-crm-calendar-data", verifyToken, deleteCrmCalendarData);

module.exports = router;

// router.get(
//     "/viewAllCustomers",
//     // verifyToken,
//     // isAuthorized,
//     // isAdmin,
//     customerListController.viewAllCustomers
//   );
