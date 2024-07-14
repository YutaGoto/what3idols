import { Pane } from 'evergreen-ui';
import Image from 'next/image';

import type { FC } from 'react';

const Header: FC = () => {
  return (
    <Pane
      is="nav"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={16}
      background="nav-background-color"
      borderBottom="muted"
    >
      <Image src="/logo.svg" alt="What3Idols" width={250} height={50} />
      <Pane display="flex" alignItems="end">
        <Pane
          is="a"
          href="/"
          display="flex"
          alignItems="end"
          padding={16}
          color="inherit"
          textDecoration="none"
        >
          Idols to Map
        </Pane>

        <Pane
          is="a"
          href="/maps"
          display="flex"
          alignItems="end"
          padding={16}
          color="inherit"
          textDecoration="none"
        >
          Map to Idols
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Header;
