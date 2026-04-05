const { createRecordService, getRecordsService, updateRecordService,deleteRecordService } = require("../services/record.service.js")

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
const updateRecordController = async (req, res) => {
  try {
    const recordId = req.params.id
    const user = req.user
    const data = req.body

    const updated = await updateRecordService(recordId, user, data)

    res.status(200).json({
      message: "Record updated",
      data: updated
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
 const deleteRecordController = async (req, res) => {
  try {
    const recordId = req.params.id
    const user = req.user

    await deleteRecordService(recordId, user)

    res.status(200).json({
      message: "Record deleted"
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


module.exports = { createRecordController, getRecordsController, updateRecordController ,deleteRecordController}