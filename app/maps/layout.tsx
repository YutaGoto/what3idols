import React, { ReactNode } from 'react';

import { MapApiProvider } from '../../providers/MapApiProvider';
import { RootProvider } from '../../providers/ThemeProvider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <title>What3Idols</title>
      </head>
      <body>
        <RootProvider>
          <MapApiProvider>{children}</MapApiProvider>
        </RootProvider>
      </body>
    </html>
  );
}
