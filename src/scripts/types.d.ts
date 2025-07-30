interface Window {
  monaco?: {
    editor?: {
      getEditors?: () => Array<{
        getValue: () => string;
        getModel: () => {
          getLanguageId?: () => string;
        } | null;
      }>;
    };
  };
}