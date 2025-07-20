import { useState, useEffect } from "react"
import { getNudge } from "../services/nudgeService"
import type { LeetCodeData } from "../types"

interface NudgeModalProps {
  leetCodeData: LeetCodeData
  isOpen: boolean
  onClose: () => void
}

export const NudgeModal = ({ leetCodeData, isOpen, onClose }: NudgeModalProps) => {
  const [nudge, setNudge] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

  // useEffect(() => {
  //   if (isOpen) {
  //     fetchNudge()
  //   }
  // }, [isOpen])

  const fetchNudge = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      const response = await getNudge(leetCodeData)
      setNudge(response.nudge)
    } catch (err) {
      setError("Failed to get nudge. Please try again.")
      console.error("Error fetching nudge:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetAnotherNudge = () => {
    fetchNudge()
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 10001,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            💡 Nudge for: {leetCodeData.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Problem Statement */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Problem Statement:</h3>
          <p className="text-sm text-gray-600 mb-3">{leetCodeData.statement}</p>
          
          {leetCodeData.examples.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Examples:</h4>
              {leetCodeData.examples.map((example, index) => (
                <p key={index} className="text-xs text-gray-600 mb-1">{example}</p>
              ))}
            </div>
          )}
          
          {leetCodeData.constraints.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Constraints:</h4>
              {leetCodeData.constraints.map((constraint, index) => (
                <p key={index} className="text-xs text-gray-600 mb-1">{constraint}</p>
              ))}
            </div>
          )}
        </div>


        {/* Content */}
        <div className="mb-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Getting your nudge...</span>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">{nudge}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={handleGetAnotherNudge}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Another Nudge
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
} 