
import { API_URL } from "~config"
import type { LeetCodeData, NudgeResponse } from "../types"
import axios from "axios"
import { getLeetCodeCodeAndLanguage } from "~utils"

export const getNudge = async (leetCodeData: LeetCodeData): Promise<NudgeResponse> => {
  try {
    const { code, language } = await getLeetCodeCodeAndLanguage()
    const response = await axios.post(`${API_URL}/api/nudge`, {
      ...leetCodeData,
      code,
      language
    })
    const nudge = response.data.nudge
    
    return { nudge }

  } catch (error) {
    console.error('Error fetching nudge:', error)
    throw error
  }
} 