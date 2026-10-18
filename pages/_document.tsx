import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        const { locale } = this.props.__NEXT_DATA__.query;
        return (
            <Html lang={Array.isArray(locale) ? locale[0] : locale}>
                <Head>
                    <meta charSet="utf-8" />

                    {/* <!-- Theme Check and Update --> */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `try{var t=localStorage.getItem('hs_theme');if(t==='dark'||t==='light')document.documentElement.classList.add(t);}catch(e){}`,
                        }}
                    />
                    {/* <!-- CSS Preline --> */}
                    <link rel="stylesheet" href="https://preline.co/assets/css/main.min.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;