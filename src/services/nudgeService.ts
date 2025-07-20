
import { API_URL } from "~config"
import type { LeetCodeData, NudgeResponse } from "../types"
import axios from "axios"

export const getNudge = async (leetCodeData: LeetCodeData): Promise<NudgeResponse> => {
  try {
    debugger;
    const response = await axios.post(`${API_URL}/api/nudge`, leetCodeData)
    const nudge = response.data.nudge
    
    return { nudge }

  } catch (error) {
    console.error('Error fetching nudge:', error)
    throw error
  }
} 