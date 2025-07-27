(function() {
    const MESSAGE_TYPE = "LEETCODE_MONACO_GET";
    try {
      const editor = window.monaco?.editor?.getEditors?.()[0];
      const code = editor?.getValue() ?? null;
      const language = editor?.getModel()?.getLanguageId?.() ?? null;
      window.postMessage({
        type: MESSAGE_TYPE,
        payload: { code, language }
      }, "*");
    } catch (e) {
      window.postMessage({
        type: MESSAGE_TYPE,
        payload: { code: null, language: null }
      }, "*");
    }
  })();
  