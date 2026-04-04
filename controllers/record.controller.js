const { createRecordService, getRecordsService } = require("../services/record.service.js")

const createRecordController = async (req, res) => {
  try {
    const userId = req.user.id
    const recordData = req.body

    const record = await createRecordService(userId, recordData)

    res.status(201).json({
      message: "Record created successfully",
      data: record
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getRecordsController = async (req, res) => {
  console.log(req.query)
  try {
    const userId = req.user.id
    const query = req.query

    const records = await getRecordsService(userId, query)

    res.status(200).json({
      data: records
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}



module.exports = { createRecordController, getRecordsController }