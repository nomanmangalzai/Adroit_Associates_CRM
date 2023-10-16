// emailRoutes.js

const express = require("express");
const router = express.Router();

const { saveCrmCalendarData } = require("../controller/crmCalendar");
const { getCrmCalendarData } = require("../controller/crmCalendar");
const { updateCrmCalendarData } = require("../controller/crmCalendar");
const { deleteCrmCalendarData } = require("../controller/crmCalendar");

router.post("/save-crm-calendar-data", saveCrmCalendarData);
router.get("/get-crm-calendar-data", getCrmCalendarData);
router.put("/update-crm-calendar-data", updateCrmCalendarData);
router.delete("/delete-crm-calendar-data", deleteCrmCalendarData);

module.exports = router;
