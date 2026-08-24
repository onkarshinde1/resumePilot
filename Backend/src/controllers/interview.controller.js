const mongoose = require("mongoose")
const { PDFParse } = require("pdf-parse")
const {generateInterviewReport , generateResumePdf} = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description controller to generate the interview report based on self description , resume and job description
 */
async function generateInterviewReportController(req, res){
    try {
        const resumeFile = req.file
        if (!resumeFile) {
            return res.status(400).json({
                success: false,
                message: "Resume PDF file is required"
            })
        }

        const { selfDescription, jobDescription } = req.body
        if (!jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Job description is required"
            })
        }

        // Parse PDF content.
        const parser = new PDFParse({ data: resumeFile.buffer, verbosity: 0 })
        const parsedPdf = await parser.getText()
        const resumeContent = parsedPdf.text

        // Clean up parser resources
        await parser.destroy()

        // Call the AI generation service
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription: selfDescription || "",
            jobDescription
        })

        // Save report to DB (mapping fields from AI report & requests)
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription: selfDescription || "",
            jobDescription,
            matchScore: interviewReportByAi.matchScore,
            technicalQuestions: interviewReportByAi.technicalQuestions,
            behavioralQuestions: interviewReportByAi.behavioralQuestions,
            skillGaps: interviewReportByAi.skillGaps,
            preparationPlan: interviewReportByAi.preparationPlan,
            title: interviewReportByAi.title
        })

        return res.status(201).json({
            success: true,
            message: "Interview report generated successfully",
            data: interviewReport
        })
    } catch (error) {
        console.error("Error generating interview report:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to generate interview report",
            error: error.message
        })
    }
}

/**
 * @description controller to get interview report on basis of ID
 */
async function getInterviewReportByIdController(req, res){
    try {
        const { interviewID } = req.params
        if (!interviewID || !mongoose.Types.ObjectId.isValid(interviewID)) {
            return res.status(400).json({
                success: false,
                message: "A valid Interview report ID is required"
            })
        }

        const interviewReport = await interviewReportModel.findById(interviewID)
        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Interview report fetched successfully",
            data: interviewReport
        })
    } catch (error) {
        console.error("Error fetching interview report:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch interview report",
            error: error.message
        })
    }
}

/**
 * @description controller to get the all reports of logged in user
 */
async function getAllInterviewReportController(req, res){
    try {
        const interviewReports = await interviewReportModel.find({user: req.user.id})
        if (!interviewReports) {
            return res.status(404).json({
                success: false,
                message: "No interview reports found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Interview reports fetched successfully",
            data: interviewReports
        })
    } catch (error) {
        console.error("Error fetching interview reports:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch interview reports",
            error: error.message
        })
    }
}

/**
 * @description controller to generate the resumePDF based on user resume , self and job description
 */

async function generateResumePdfController(req, res){
    try {
        const { interviewID } = req.params
        if (!interviewID || !mongoose.Types.ObjectId.isValid(interviewID)) {
            return res.status(400).json({
                success: false,
                message: "A valid Interview report ID is required"
            })
        }

        const interviewReport = await interviewReportModel.findById(interviewID)
        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            })
        }

        const { resume , jobDescription , selfDescription } = interviewReport
        const pdfBuffer = await generateResumePdf({ resume, selfDescription, jobDescription })
        
        res.set({
            "content-type": "application/pdf",
            "content-disposition": `attachment :filename= resume_${interviewReport._id}.pdf`
        })
        return res.status(200).send(pdfBuffer)
    } catch (error) {
        console.error("Error generating resume PDF:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to generate resume PDF",
            error: error.message
        })
    }
}

module.exports = {generateInterviewReportController, getInterviewReportByIdController , getAllInterviewReportController ,generateResumePdfController}