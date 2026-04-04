const { createRecordService } = require("../services/record.service.js")

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

module.exports = { createRecordController }