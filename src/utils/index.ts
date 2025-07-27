declare global {
  interface Window {
    monaco?: any
  }
}

export type LeetCodeEditorData = {
  code: string | null
  language: string | null
}

// Unique message ID to avoid collisions
const MESSAGE_TYPE = "LEETCODE_MONACO_GET"

export const getLeetCodeCodeAndLanguage = (): Promise<LeetCodeEditorData> => {
  return new Promise((resolve) => {
    const MESSAGE_TYPE = "LEETCODE_MONACO_GET"

    const handler = (event: MessageEvent) => {
      if (event.source !== window || event.data?.type !== MESSAGE_TYPE) return

      window.removeEventListener("message", handler)
      resolve(event.data.payload)
    }

    window.addEventListener("message", handler)

    // Inject the real script
    const script = document.createElement("script")
    script.src = chrome.runtime.getURL("scripts/inject-monaco-reader.js")
    script.onload = () => script.remove()
    document.documentElement.appendChild(script)
  })
}


