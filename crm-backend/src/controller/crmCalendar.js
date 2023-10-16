const crmCalendar = require('../models/crmCalendar');

const saveCrmCalendarData = async (req, res, next) => {
  console.log("saveCrmCalendarData API called");

  const {
    organization,
    contactTitle,
    phoneNumber,
    emailAddress,
    meetingSubject,
    clientPOC,
    status,
    date,
    time,
    additionalNotes
  } = req.body;
  
  try {
    const newCrmCalendar = new crmCalendar({
      organization: organization,
      contactTitle: contactTitle,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
      meetingSubject: meetingSubject,
      clientPOC: clientPOC,
      status: status,
      date: date,
      time: time,
      additionalNotes: additionalNotes
    });

      try {
        await newCrmCalendar.save();
        res.status(201).json({message:"The CRM calendar data has been successfully saved."})
      } catch (error) {
        res.status(500).send(error);

      }


  
  } catch (error) {
    console.error('Error saving crmCalendar data:', error);
    throw error;
  }
}


//get crmCalendar Data
const getCrmCalendarData = async (req, res, next) => {
  console.log("getCrmCalendarData API called");

  try {
    const calendarData = await crmCalendar.find();
    res.status(200).json(calendarData);
  } catch (error) {
    console.error('Error fetching crmCalendar data:', error);
    res.status(500).send(error);
  }
}

const updateCrmCalendarData = async (req, res, next) => {
  console.log("updateCrmCalendarData API called");

  const {
    organization,
    contactTitle,
    phoneNumber,
    emailAddress,
    meetingSubject,
    clientPOC,
    status,
    date,
    time,
    additionalNotes
  } = req.body;
  console.log(organization);

  try {
    const existingCrmCalendar = await crmCalendar.findOne({ organization: organization });

    if (existingCrmCalendar) {
      // Update the fields with the new values
      existingCrmCalendar.contactTitle = contactTitle;
      existingCrmCalendar.phoneNumber = phoneNumber;
      existingCrmCalendar.emailAddress = emailAddress;
      existingCrmCalendar.meetingSubject = meetingSubject;
      existingCrmCalendar.clientPOC = clientPOC;
      existingCrmCalendar.status = status;
      existingCrmCalendar.date = date;
      existingCrmCalendar.time = time;
      existingCrmCalendar.additionalNotes = additionalNotes;

      try {
        // Save the updated crmCalendar entry
        await existingCrmCalendar.save();
        res.status(200).json({ message: "The CRM calendar data has been successfully updated." });
      } catch (error) {
        console.error('Error saving updated crmCalendar entry:', error);
        res.status(500).send(error);
      }
    } else {
      res.status(404).json({ message: "The CRM calendar data could not be found." });
    }
  } catch (error) {
    console.error('Error finding crmCalendar entry:', error);
    res.status(500).send(error);
  }
};

//delete API is below
const deleteCrmCalendarData = async (req, res, next) => {
  console.log("deleteCrmCalendarData API called");

  const{organization} = req.body;
  console.log(organization)

  try {
    await crmCalendar.deleteOne({ organization: organization }); // Change the field name 'name' to match your organization schema
    res.status(200).send("Organization data deleted successfully.");
  } catch (error) {
    console.error('Error deleting organization data:', error);
    res.status(500).send(error);
  }
}

module.exports = {
  saveCrmCalendarData,
  getCrmCalendarData,
  updateCrmCalendarData,
  deleteCrmCalendarData
};