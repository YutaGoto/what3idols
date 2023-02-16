import React, { ReactNode } from 'react';

import '../../styles/globals.scss';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <title>What3Idols</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
