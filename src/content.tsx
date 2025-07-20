import type { PlasmoContentScript } from "plasmo"
import { useEffect, useState } from "react"
import { NudgeWidget } from "./components/NudgeWidget"
import type { LeetCodeData } from "./types"
import { extractCode, setupCodeObserver, getCurrentCode, resetCodeTracking } from "~utils/index"

export const config: PlasmoContentScript = {
  matches: ["https://leetcode.com/problems/*"]
}

// Function to scrape LeetCode problem data
const scrapeLeetCodeData = (): LeetCodeData | null => {
  try {

    let title = "Unknown Problem"
    const titleLink = document.querySelector('a[href*="/problems/"]')
    if (titleLink) {
      title = titleLink.textContent?.trim()?.split(".")[1]?.trim() || "Unknown Problem"
    }

    const statementElement = document.querySelector('[data-track-load="description_content"]')
    // Extract all text from the element and its children recursively
    const getAllText = (el: Element | null): string => {
      if (!el) return ""
      let text = ""
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          text += getAllText(node as Element)
        }
      }
      return text
    }
    const fullStatement = getAllText(statementElement).trim()

    // Parse the statement into parts
    const parseStatement = (text: string) => {
      const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
      
      let statement = ""
      const examples: string[] = []
      const constraints: string[] = []
      
      let currentSection = 'statement'
      let currentExample = ""
      
      for (const line of lines) {
        // Check for section headers
        if (line.toLowerCase().includes('example') && (line.toLowerCase().includes('example 1:') || line.toLowerCase().includes('example'))) {
          if (currentExample) {
            examples.push(currentExample.trim())
            currentExample = ""
          }
          currentSection = 'examples'
          currentExample = line
        } else if (line.toLowerCase().includes('constraints:') || line.toLowerCase().includes('constraint')) {
          if (currentExample) {
            examples.push(currentExample.trim())
            currentExample = ""
          }
          currentSection = 'constraints'
          constraints.push(line)
        } else {
          if (currentSection === 'statement') {
            statement += (statement ? '\n' : '') + line
          } else if (currentSection === 'examples') {
            currentExample += (currentExample ? '\n' : '') + line
          } else if (currentSection === 'constraints') {
            constraints.push(line)
          }
        }
      }
      
      // Add the last example if there is one
      if (currentExample) {
        examples.push(currentExample.trim())
      }
      
      return {
        statement: statement.trim(),
        examples: examples.filter(ex => ex.length > 0),
        constraints: constraints.filter(con => con.length > 0)
      }
    }

    // Set up code observer for dynamic updates
    setupCodeObserver()
    
    // Get current code
    const code = getCurrentCode()
    console.log("Current code:", code)

    const languageSelector = document.querySelector('[data-cy="language-selector"]')
    const language = languageSelector?.textContent?.trim() || "Python"

    const { statement, examples, constraints } = parseStatement(fullStatement)

    return {
      title,
      statement,
      examples,
      constraints,
      language,
      code
    }
  } catch (error) {
    console.error("Error scraping LeetCode data:", error)
    return null
  }
}

// Main content script component
const LeetCodeContent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [leetCodeData, setLeetCodeData] = useState<LeetCodeData | null>(null)

  const viewLinesElement = document.querySelector('.view-lines.monaco-mouse-cursor-text')

  useEffect(() => {
    // Check if we're on a LeetCode problem page
    const isLeetCodeProblem = window.location.href.includes("leetcode.com/problems/")
    
    if (isLeetCodeProblem) {
      // Reset code tracking when switching problems
      resetCodeTracking()
      
      // Wait for page to load completely
      const checkForElements = () => {
        const data = scrapeLeetCodeData()
        if (data && data.title !== "Unknown Problem") {
          setLeetCodeData(data)
          setIsVisible(true)
        } else {
          // Retry after a short delay if elements aren't loaded yet
          setTimeout(checkForElements, 1000)
        }
      }

      // Initial check
      checkForElements()

      // Set up mutation observer to detect dynamic content changes
      const observer = new MutationObserver(() => {
        if (!isVisible) {
          checkForElements()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      return () => observer.disconnect()
    }
  }, [isVisible])

  useEffect(() => {
    setupCodeObserver()
    const code = getCurrentCode()
    setLeetCodeData({
      ...leetCodeData,
      code
    })
  }, [viewLinesElement])

  if (!isVisible || !leetCodeData) {
    return null
  }

  return <NudgeWidget leetCodeData={leetCodeData} />
}

export default LeetCodeContent 