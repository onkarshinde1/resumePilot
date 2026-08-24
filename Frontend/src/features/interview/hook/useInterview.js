import { generateInterviewReport, getInterviewReportById, getAllInterviewReport, generateResumePdf } from "../services/interview.api"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { interviewContext } from "../interview.context"
import { useAuth } from "../../auth/hooks/useAuth";

const useInterview = () => {
    const context = useContext(interviewContext)
    if (!context) {
        throw new Error("useInterview must be used within InterviewProvider")
    }

    const { setLoading, setReport, setReports, loading, report, reports } = context
    const navigate = useNavigate()


    const handleGenerateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        try {
            setLoading(true);
            const res = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(res.data);
            navigate(`/interview/${res.data._id}`);
            return res.data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetInterviewReportById = async (interviewId) => {
        try {
            setLoading(true);
            const res = await getInterviewReportById(interviewId);
            setReport(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetAllInterviewReport = async () => {
        try {
            setLoading(true);
            const res = await getAllInterviewReport();
            setReports(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null

        try {
            response = await generateResumePdf({ interviewId: interviewReportId })

            const url = window.URL.createObjectURL(
                new Blob([response], { type: "application/pdf" })
            )

            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        handleGenerateInterviewReport,
        handleGetInterviewReportById,
        handleGetAllInterviewReport,
        getResumePdf,
        loading,
        report,
        reports
    }

}

export default useInterview