# 💡 Leet-Nudge

A browser extension that helps you solve LeetCode problems by providing context-aware hints without spoiling the solution.

## 🎯 Features

- **Smart Detection**: Automatically detects when you're on a LeetCode problem page
- **Non-intrusive Widget**: Floating 💡 button in the bottom-right corner
- **Context-Aware Hints**: Provides hints based on your current code and problem
- **Learning-Focused**: Guides you toward the solution without giving it away
- **Clean UI**: Modern, responsive design that doesn't interfere with your workflow

## 🚀 Getting Started

### Development

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-dev` folder

### Building for Production

```bash
pnpm build
```

## 🏗️ Architecture

- **Content Script** (`src/content.tsx`): Detects LeetCode pages and scrapes problem data
- **Nudge Widget** (`src/components/NudgeWidget.tsx`): Floating button component
- **Nudge Modal** (`src/components/NudgeModal.tsx`): Modal for displaying hints
- **Nudge Service** (`src/services/nudgeService.ts`): Handles API calls (currently uses hardcoded responses)

## 🔧 Technical Details

- Built with [Plasmo](https://www.plasmo.com/) framework
- React + TypeScript + Tailwind CSS
- Manifest V3 compatible
- Uses MutationObserver for dynamic content detection

## 🎨 UI Components

- **Floating Button**: Blue circular button with 💡 emoji
- **Modal**: Clean, centered modal with problem title and hint
- **Loading States**: Spinner and loading text
- **Error Handling**: User-friendly error messages

## 🔮 Future Enhancements

- Integration with AI backend at `localhost:5001/nudge`
- Hint history and progression tracking
- More granular, step-based hints
- Support for different programming languages
- User preferences and customization

## 📝 License

MIT License - feel free to use and modify as needed!

---

Made with ❤️ for LeetCode learners
