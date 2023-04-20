'use client';

import { ThemeProvider, defaultTheme, mergeTheme } from 'evergreen-ui';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const RootProvider = ({ children }: Props) => {
  const theme = mergeTheme(defaultTheme, {
    colors: {
      'nav-background-color': '#d9f2ff',
      white: '#fbfafa',
      black: '#1e140e',
      primary: '#33d5ac',
      link: '#1945ba',
      info: '#59b7db',
      success: '#94d509',
      warning: '#ffe012',
      danger: '#e64a79',
    },
  });

  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
};
