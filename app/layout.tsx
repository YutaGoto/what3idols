import React, { ReactNode } from 'react';

import '../styles/globals.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
