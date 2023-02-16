import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />;
}

export default MyApp;
