import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});




/**
 * @description api call to generate interview report
 */

export const generateInterviewReport = async ({jobDescription , selfDescription , resumeFile}) =>{

    const formData = new FormData()

    formData.append("jobDescription" , jobDescription)
    formData.append("selfDescription" , selfDescription)
    if (resumeFile) {
        formData.append("resume", resumeFile)
    }

    const response = await api.post("/api/interview/" , formData, {
        headers :{
            "Content-Type": "multipart/form-data",
        }
    })

    return response.data
}

/** 
 * @description api call to get interview report by id
 */
export const getInterviewReportById = async (interviewId) =>{
    try {
        const response = await api.get(`/api/interview/${interviewId}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

/** 
 * @description api call to get all interview report of user
 */
export const getAllInterviewReport =async () =>{
    try {
        const response = await api.get("/api/interview/")
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

/**
 * @description service to get resume pdf based on user data
 */
export const generateResumePdf = async ({ interviewId  }) =>{
    const response = await api.post(`/api/interview/resume/pdf/${interviewId}`,null , {
        responseType: "blob",
    })
    return response.data
}