import { Pane } from 'evergreen-ui';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <Pane
      is="footer"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={16}
      background="nav-background-color"
      borderTop="muted"
    >
      <Pane>
        <p>
          <strong>What 3 Idols</strong> by <a href="https://github.com/YutaGoto">Yuta Goto</a>.
        </p>
      </Pane>
    </Pane>
  );
};

export default Footer;
