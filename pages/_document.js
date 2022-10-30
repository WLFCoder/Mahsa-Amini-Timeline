import { Html, Head, Main, NextScript } from 'next/document'
//import { GTM_ID } from '../lib/gtm'

export default function Document() {
  return (
    <Html>
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
          }}
        />
      </body>
    </Html>
  )
}