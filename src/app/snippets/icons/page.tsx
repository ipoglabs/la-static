export default function Page() {
  const icons = [
    
    { key: "phone", label: "Phone", svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.9.4 1.76.86 2.55a2 2 0 0 1-.45 2.11L8.91 9.91a16 16 0 0 0 6 6l1.53-1.53a2 2 0 0 1 2.11-.45c.79.46 1.65.74 2.55.86A2 2 0 0 1 22 16.92z" />
      </svg>
    ) },
    { key: "messages", label: "Messages", svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 2a10 10 0 1 1-4.64 18.86l-4.3 1.12a.85.85 0 0 1-1.03-1.04l1.11-4.29A10 10 0 0 1 12 2Zm1.25 11h-4.6a.75.75 0 0 0 0 1.5H13.35a.75.75 0 0 0 0-1.5h-.1Zm2-3.5h-6.6a.75.75 0 0 0 0 1.5H15.35a.75.75 0 0 0 0-1.5h-.1Z" />
      </svg>
    ) },
    { key: "help", label: "Help", svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 1a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm0-8a2.5 2.5 0 0 1 1.65 4.38l-.15.12-.22.17-.09.07-.16.15c-.33.36-.53.85-.53 1.61a.5.5 0 0 1-1 0 3.2 3.2 0 0 1 1.16-2.62l.25-.19.12-.1A1.5 1.5 0 0 0 10 6.5c-.83 0-1.5.67-1.5 1.5a.5.5 0 0 1-1 0A2.5 2.5 0 0 1 10 5.5Z" />
      </svg>
    ) },
    { key: "copy", label: "Copy", svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 2 16 16"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
        focusable="false"
      >
        <path className="ui-icon__outline" d="M10 2.5C10 2.22386 9.77614 2 9.5 2C9.22386 2 9 2.22386 9 2.5V9H2.5C2.22386 9 2 9.22386 2 9.5C2 9.77614 2.22386 10 2.5 10H9V16.5C9 16.7761 9.22386 17 9.5 17C9.77614 17 10 16.7761 10 16.5V10H16.5C16.7761 10 17 9.77614 17 9.5C17 9.22386 16.7761 9 16.5 9H10V2.5Z" />
        <path className="ui-icon__filled" d="M10.5 2.75C10.5 2.33579 10.1642 2 9.75 2C9.33579 2 9 2.33579 9 2.75V9H2.75C2.33579 9 2 9.33579 2 9.75C2 10.1642 2.33579 10.5 2.75 10.5H9V16.75C9 17.1642 9.33579 17.5 9.75 17.5C10.1642 17.5 10.5 17.1642 10.5 16.75V10.5H16.75C17.1642 10.5 17.5 10.1642 17.5 9.75C17.5 9.33579 17.1642 9 16.75 9H10.5V2.75Z" />
      </svg>
    ) },
    { key: "map", label: "Map", svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 0 1 2 15.382V5.618A2 2 0 0 1 3.553 3.894L9 1l6 3 5 2v9l-5 2-6 3z" />
      </svg>
    ) },
    { key: "users", label: "Users", svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 2 16 16"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
        focusable="false"
      >
        <path className="ui-icon__outline" d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z" />
        <path className="ui-icon__outline" d="M7.15467 12.4273C8.66416 13.9463 11.0877 14.0045 12.6671 12.5961L12.8453 12.4273C13.04 12.2314 13.3566 12.2304 13.5524 12.4251C13.7265 12.5981 13.7467 12.8674 13.6123 13.0627L13.5547 13.1322L13.5323 13.1545C11.5691 15.1054 8.39616 15.0953 6.44533 13.1322C6.25069 12.9363 6.25169 12.6197 6.44757 12.4251C6.64344 12.2304 6.96002 12.2314 7.15467 12.4273Z" />
        <path className="ui-icon__outline" d="M12.5 7.5C13.0523 7.5 13.5 7.94772 13.5 8.5C13.5 9.05228 13.0523 9.5 12.5 9.5C11.9477 9.5 11.5 9.05228 11.5 8.5C11.5 7.94772 11.9477 7.5 12.5 7.5Z" />
        <path className="ui-icon__outline" d="M7.5 7.5C8.05228 7.5 8.5 7.94772 8.5 8.5C8.5 9.05228 8.05228 9.5 7.5 9.5C6.94772 9.5 6.5 9.05228 6.5 8.5C6.5 7.94772 6.94772 7.5 7.5 7.5Z" />
      </svg>
    ) },
    { key: "account-settings", label: "Account Settings", svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M1.91 7.38A8.5 8.5 0 0 1 3.7 4.3a.5.5 0 0 1 .54-.13l1.92.68a1 1 0 0 0 1.32-.76l.36-2a.5.5 0 0 1 .4-.4 8.53 8.53 0 0 1 3.55 0c.2.04.35.2.38.4l.37 2a1 1 0 0 0 1.32.76l1.92-.68a.5.5 0 0 1 .54.13 8.5 8.5 0 0 1 1.78 3.08c.06.2 0 .4-.15.54l-1.56 1.32a1 1 0 0 0 0 1.52l1.56 1.32a.5.5 0 0 1 .15.54 8.5 8.5 0 0 1-1.78 3.08.5.5 0 0 1-.54.13l-1.92-.68a1 1 0 0 0-1.32.76l-.37 2a.5.5 0 0 1-.38.4 8.53 8.53 0 0 1-3.56 0 .5.5 0 0 1-.39-.4l-.36-2a1 1 0 0 0-1.32-.76l-1.92.68a.5.5 0 0 1-.54-.13 8.5 8.5 0 0 1-1.78-3.08.5.5 0 0 1 .15-.54l1.56-1.32a1 1 0 0 0 0-1.52L2.06 7.92a.5.5 0 0 1-.15-.54Zm1.06 0 1.3 1.1a2 2 0 0 1 0 3.04l-1.3 1.1c.3.79.72 1.51 1.25 2.16l1.6-.58a2 2 0 0 1 2.63 1.53l.3 1.67a7.56 7.56 0 0 0 2.5 0l.3-1.67a2 2 0 0 1 2.64-1.53l1.6.58a7.5 7.5 0 0 0 1.24-2.16l-1.3-1.1a2 2 0 0 1 0-3.04l1.3-1.1a7.5 7.5 0 0 0-1.25-2.16l-1.6.58a2 2 0 0 1-2.63-1.53l-.3-1.67a7.55 7.55 0 0 0-2.5 0l-.3 1.67A2 2 0 0 1 5.81 5.8l-1.6-.58a7.5 7.5 0 0 0-1.24 2.16ZM7.5 10a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm1 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />
      </svg>
    ) },
    { key: "user-add", label: "Add User", svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M6.5 8.5c0-.28.22-.5.5-.5h2.5V5.5a.5.5 0 0 1 1 0V8H13a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0V9H7a.5.5 0 0 1-.5-.5Zm8.45 5.46a7 7 0 1 0-9.9 0l1.52 1.5 2.04 1.98.14.12a2 2 0 0 0 2.64-.12l2.43-2.37 1.13-1.12Zm-9.2-9.2a6 6 0 0 1 8.67 8.3l-.18.19-1.32 1.3-2.23 2.17-.09.08a1 1 0 0 1-1.2 0l-.1-.08-2.97-2.9-.58-.57-.17-.18a6 6 0 0 1 .17-8.31Z" />
      </svg>
    ) },
    { key: "trash", label: "Trash", svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="2 2 16 16"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
        focusable="false"
      >
        <path className="ui-icon__outline" d="M11.5 4a1.5 1.5 0 00-3 0h-1a2.5 2.5 0 015 0H17a.5.5 0 010 1h-.554L15.15 16.23A2 2 0 0113.163 18H6.837a2 2 0 01-1.987-1.77L3.553 5H3a.5.5 0 01-.492-.41L2.5 4.5A.5.5 0 013 4h8.5zm3.938 1H4.561l1.282 11.115a1 1 0 00.994.885h6.326a1 1 0 00.993-.885L15.438 5zM8.5 7.5c.245 0 .45.155.492.359L9 7.938v6.125c0 .241-.224.437-.5.437-.245 0-.45-.155-.492-.359L8 14.062V7.939c0-.242.224-.438.5-.438zm3 0c.245 0 .45.155.492.359l.008.079v6.125c0 .241-.224.437-.5.437-.245 0-.45-.155-.492-.359L11 14.062V7.939c0-.242.224-.438.5-.438z" />
        <path className="ui-icon__filled" d="M10 1.25a2.75 2.75 0 012.739 2.5H17a.75.75 0 01.102 1.493L17 5.25h-.583L15.15 16.23A2 2 0 0113.163 18H6.837a2 2 0 01-1.987-1.77L3.582 5.25H3a.75.75 0 01-.743-.648L2.25 4.5a.75.75 0 01.648-.743L3 3.75h4.261A2.75 2.75 0 0110 1.25zM8.5 7.5c-.245 0-.45.155-.492.359L8 7.938v6.125l.008.078c.042.204.247.359.492.359s.45-.155.492-.359L9 14.062V7.939l-.008-.08C8.95 7.656 8.745 7.5 8.5 7.5zm3 0c-.245 0-.45.155-.492.359L11 7.938v6.125l.008.078c.042.204.247.359.492.359s.45-.155.492-.359l.008-.079V7.939l-.008-.08c-.042-.203-.247-.358-.492-.358zM10 2.75c-.605 0-1.11.43-1.225 1h2.45c-.116-.57-.62-1-1.225-1z" />
      </svg>
    ) },
    { key: "tick", label: "Tick", svg: (
      <svg aria-label="Success" className="bolt-status flex-none success icon-large-margin" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <desc>Success</desc>
        <circle cx="8" cy="8" r="8"></circle>
        <path d="M6.062 11.144l-.003-.002-1.784-1.785A.937.937 0 1 1 5.6 8.031l1.125 1.124 3.88-3.88A.937.937 0 1 1 11.931 6.6l-4.54 4.54-.004.004a.938.938 0 0 1-1.325 0z" fill="#fff"></path>
      </svg>
    ) },
    { key: "avatar-available", label: "Avatar — Available", svg: (
      <div className="relative h-8 w-8" aria-hidden="true">
        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700">KG</div>
        <span className="absolute bottom-0 right-0 inline-block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
      </div>
    ) },
    { key: "avatar-busy", label: "Avatar — Busy", svg: (
      <div className="relative h-8 w-8" aria-hidden="true">
        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700">KG</div>
        <span className="absolute bottom-0 right-0 inline-block h-3 w-3 rounded-full bg-rose-500 ring-2 ring-white" />
      </div>
    ) },
    { key: "warning", label: "Warning", svg: (
      <svg aria-label="Warning" className="bolt-status flex-none warning icon-large-margin" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <desc>Warning</desc>
        <circle cx="8" cy="8" r="8"></circle>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.91 3.9a.9.9 0 0 0-1.8 0v4.7a.9.9 0 1 0 1.8 0V3.9zm-.95 8.65a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z" fill="#fff"></path>
      </svg>
    ) },
    { key: "error", label: "Error", svg: (
      <svg aria-label="Failed" className="bolt-status flex-none failed icon-large-margin" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <desc>Failed</desc>
        <circle cx="8" cy="8" r="8"></circle>
        <path d="M10.984 5.004a.9.9 0 0 1 0 1.272L9.27 7.99l1.74 1.741a.9.9 0 1 1-1.272 1.273l-1.74-1.741-1.742 1.74a.9.9 0 1 1-1.272-1.272l1.74-1.74-1.713-1.714a.9.9 0 0 1 1.273-1.273l1.713 1.713 1.714-1.713a.9.9 0 0 1 1.273 0z" fill="#fff"></path>
      </svg>
    ) },
  ];

    const textEditorIcons = [
      {
        key: "text-editor-users",
        label: "Text Editor — Users",
        svg: (
          <svg
            role="img"
            aria-hidden="true"
            focusable="false"
            viewBox="2 2 16 16"
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="ui-icon__filled">
              <path d="M9 6.5a2.5 2.5 0 10-1.174 2.12 8.802 8.802 0 01-.952 2.764c-.649 1.18-1.476 2.011-2.228 2.762a.5.5 0 00.708.708l.011-.012c.747-.747 1.664-1.664 2.386-2.976C8.48 10.538 9 8.83 9 6.5zM14.826 8.62A2.5 2.5 0 1116 6.5c0 2.33-.52 4.038-1.25 5.366-.721 1.312-1.638 2.23-2.384 2.976l-.012.012a.5.5 0 01-.708-.708c.752-.751 1.579-1.581 2.228-2.762a8.8 8.8 0 00.952-2.765z" fill="currentColor" />
            </g>
            <g className="ui-icon__outline">
              <path d="M7.826 8.62a8.802 8.802 0 01-.952 2.764c-.649 1.18-1.476 2.011-2.228 2.762a.5.5 0 00.708.708l.011-.012c.747-.747 1.664-1.664 2.386-2.976C8.48 10.538 9 8.83 9 6.5a2.5 2.5 0 10-1.174 2.12zM8 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM14.826 8.62a8.8 8.8 0 01-.952 2.764c-.649 1.18-1.476 2.011-2.228 2.762a.5.5 0 00.708.708l.012-.012c.746-.747 1.663-1.664 2.385-2.976C15.48 10.538 16 8.83 16 6.5a2.5 2.5 0 10-1.174 2.12zM13.5 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </g>
          </svg>
        ),
      },
    ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Icon Collection</h1>

      <p className="text-sm text-slate-600 mb-4">A tiny gallery of inline SVG icons for reference.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {icons.map((ic) => (
          <div key={ic.key} className="flex flex-col items-center gap-2 p-3 rounded-md bg-white border border-slate-100 shadow-sm">
            <div className="text-slate-800">{ic.svg}</div>
            <div className="text-xs text-slate-500">{ic.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-medium mb-3">Text Editor Icons</h2>
        <p className="text-sm text-slate-600 mb-4">Icons used in text editor UI.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {textEditorIcons.map((ic) => (
            <div key={ic.key} className="flex flex-col items-center gap-2 p-3 rounded-md bg-white border border-slate-100 shadow-sm">
              <div className="text-slate-800">{ic.svg}</div>
              <div className="text-xs text-slate-500">{ic.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
