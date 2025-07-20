// Track code lines to avoid duplicates
let codeLines: string[] = []
let isObserverActive = false

// Extract text content from a view-line element
const extractLineText = (lineElement: Element): string => {
  const textSpans = lineElement.querySelectorAll('span')
  return Array.from(textSpans)
    .map(span => span.textContent || '')
    .join('')
}

// Extract all code from Monaco editor
export const extractCode = (): string => {
  const viewLinesElement = document.querySelector('.view-lines.monaco-mouse-cursor-text')
  if (!viewLinesElement) {
    return codeLines.join('\n')
  }

  const viewLines = viewLinesElement.querySelectorAll('.view-line')
  const currentLines = Array.from(viewLines)
    .map(line => extractLineText(line))
    .filter(line => line.trim().length > 0) // Filter out empty lines

  // Add new lines to our tracking array
  currentLines.forEach(line => {
    if (!codeLines.includes(line)) {
      codeLines.push(line)
    }
  })

  return codeLines.join('\n')
}

// Set up mutation observer to track code changes
export const setupCodeObserver = (): void => {
  if (isObserverActive) return

  const viewLinesElement = document.querySelector('.view-lines.monaco-mouse-cursor-text')
  if (!viewLinesElement) {
    // Retry after a short delay if element doesn't exist yet
    setTimeout(setupCodeObserver, 1000)
    return
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Check for added or removed view-line elements
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            if (element.classList.contains('view-line')) {
              const lineText = extractLineText(element)
              if (lineText.trim() && !codeLines.includes(lineText)) {
                codeLines.push(lineText)
                console.log("codeLines", codeLines)
                console.log('Added new line:', lineText)
              }
            }
          }
        }) 

        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            if (element.classList.contains('view-line')) {
              const lineText = extractLineText(element)
              const index = codeLines.indexOf(lineText)
              if (index > -1) {
                codeLines.splice(index, 1)
                console.log("codeLines", codeLines)
                console.log('Removed line:', lineText)
              }
            }
          }
        })
      } else if (mutation.type === 'characterData') {
        // Handle text content changes within existing lines
        const lineElement = mutation.target.parentElement?.closest('.view-line')
        if (lineElement) {
          const lineText = extractLineText(lineElement)
          // Update the line in our tracking array
          const index = codeLines.findIndex(line => 
            lineElement.textContent?.includes(line) || line.includes(lineElement.textContent || '')
          )
          if (index > -1) {
            codeLines[index] = lineText
            console.log("codeLines", codeLines)
            console.log('Updated line:', lineText)
          }
        }
      }
    })
  })

  observer.observe(viewLinesElement, {
    childList: true,
    subtree: true,
    characterData: true
  })

  isObserverActive = true
  console.log('Code observer set up successfully')
}

// Reset code tracking (useful when switching problems)
export const resetCodeTracking = (): void => {
  codeLines = []
  isObserverActive = false
  console.log('Code tracking reset')
}

// Get current code as string
export const getCurrentCode = (): string => {
  return codeLines.join('\n')
} 