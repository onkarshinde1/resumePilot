const express = require('express')
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middleware/file.middleware")

const interviewRouter = express.Router()


/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description,
 * resume PDF and job description
 * @access private
 */

interviewRouter.post("/", authMiddleware.authUser,upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/:interviewID
 * @description get interview report by id
 * @access private
 */

interviewRouter.get("/:interviewID", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview
 * @description get all interview report of loged in user
 * @access private
 */

interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportController)


/**
 * @route POST /api/interview/:interviewID/download-resume
 * @description generate and download the resume of the user based on interview id
 * @access private
 */

interviewRouter.post("/resume/pdf/:interviewID", authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter