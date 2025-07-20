import "./style.css"

function IndexPopup() {
  return (
    <div className="p-6 w-80">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">💡 Leet-Nudge</h1>
        <p className="text-gray-600 text-sm">
          Get helpful hints while solving LeetCode problems
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">How it works:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Visit any LeetCode problem page</li>
            <li>• Click the 💡 button in the bottom-right</li>
            <li>• Get context-aware hints to guide your solution</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Features:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Non-intrusive floating widget</li>
            <li>• Smart hints based on your code</li>
            <li>• Preserves learning experience</li>
            <li>• Works on all LeetCode problems</li>
          </ul>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            Made with ❤️ for LeetCode learners
          </p>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
