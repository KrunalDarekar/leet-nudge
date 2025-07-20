import { useState } from "react"
import type { LeetCodeData } from "../types"
import { NudgeModal } from "./NudgeModal"

interface NudgeWidgetProps {
  leetCodeData: LeetCodeData
}

export const NudgeWidget = ({ leetCodeData }: NudgeWidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNudgeClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Floating Nudge Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 10000,
          cursor: "pointer"
        }}
        onClick={handleNudgeClick}
        title="Need a nudge?"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-colors duration-200"
      >
        <span className="text-xl">💡</span>
      </div>

      {/* Nudge Modal */}
      {isModalOpen && (
        <NudgeModal
          leetCodeData={leetCodeData}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
} 