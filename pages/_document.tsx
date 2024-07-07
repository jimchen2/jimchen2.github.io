import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.cdnfonts.com/css/kalam" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Satisfy' rel='stylesheet'/>
        <link href="https://fonts.googleapis.com/css2?family=Dekko&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown.min.css" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
