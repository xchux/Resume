import Document, { Html, Head, Main, NextScript } from 'next/document';

import Footer from '@/components/footer';

class MyDocument extends Document {
    render() {
        const { locale } = this.props.__NEXT_DATA__.query;
        return (
            <Html lang={Array.isArray(locale) ? locale[0] : locale}>
                <Head>
                    <meta charSet="utf-8" />

                    {/* <!-- Theme Check and Update --> */}
                    <script>
                        const html = document.querySelector('html');
                        const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
                        const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

                        if (isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
                        else if (isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
                        else if (isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
                        else if (isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
                    </script>
                    {/* <!-- CSS Preline --> */}
                    <link rel="stylesheet" href="https://preline.co/assets/css/main.min.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <Footer />
            </Html>
        );
    }
}

export default MyDocument;