import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1A3C34" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />
      </head>
      <body>
        <div id="app-container">{children}</div>
      </body>
    </html>
  );
}

const mobileStyles = `
  /* Reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background-color: #F0F2F5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    html, body {
      background-color: #0a0a0a;
    }
  }

  /* On desktop: center the app in a phone-sized frame */
  #app-container {
    width: 100%;
    height: 100%;
    max-width: 430px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background-color: #FFFFFF;
  }

  @media (prefers-color-scheme: dark) {
    #app-container {
      background-color: #0F1F1B;
    }
  }

  /* On desktop screens, add a phone-like frame with shadow */
  @media (min-width: 481px) {
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px 0;
      overflow: auto;
    }

    #app-container {
      height: 100vh;
      max-height: 932px;
      border-radius: 24px;
      box-shadow:
        0 0 0 1px rgba(0, 0, 0, 0.08),
        0 8px 40px rgba(0, 0, 0, 0.12),
        0 2px 8px rgba(0, 0, 0, 0.06);
    }
  }

  /* On actual mobile: fill the screen */
  @media (max-width: 480px) {
    body {
      overflow: hidden;
    }

    #app-container {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }

  /* Ensure React Native root fills the container */
  #root, #app-container > div {
    width: 100%;
    height: 100%;
  }
`;
