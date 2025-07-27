import { useState } from "react"
import type { LeetCodeData } from "../types"
import { NudgeModal } from "./NudgeModal"

interface NudgeWidgetProps {
  leetCodeData: LeetCodeData
}

export const NudgeWidget = ({ leetCodeData }: NudgeWidgetProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(false)

  const handleNudgeClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Floating Nudge Button */}
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 10000,
          background: "#fbca1f",
          fontFamily: "inherit",
          padding: "0.3em 0.8em",
          fontWeight: 900,
          fontSize: "18px",
          border: "3px solid black",
          borderRadius: "0.4em",
          boxShadow: isButtonActive
            ? "0.05em 0.05em"
            : isButtonHovered
            ? "0.15em 0.15em"
            : "0.1em 0.1em",
          color: "black",
          cursor: "pointer",
          transform: isButtonActive
            ? "translate(0.05em, 0.05em)"
            : isButtonHovered
            ? "translate(-0.05em, -0.05em)"
            : "none"
        }}
        onClick={handleNudgeClick}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => {
          setIsButtonHovered(false)
          setIsButtonActive(false)
        }}
        onMouseDown={() => setIsButtonActive(true)}
        onMouseUp={() => setIsButtonActive(false)}
      >
        💡 Nudge
      </button>

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