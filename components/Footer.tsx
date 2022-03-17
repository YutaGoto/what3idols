import React, { VFC } from 'react';
import Image from 'next/image';
import { Footer as BulmaFooter, Container, Content, Columns } from 'react-bulma-components';

const Footer: VFC = () => {
  return (
    <BulmaFooter>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <Columns>
            <Columns.Column size={9}>
              <p>
                <strong>What 3 Idols</strong> by <a href="https://github.com/YutaGoto">Yuta Goto</a>
                .
              </p>
            </Columns.Column>
            <Columns.Column size={3}>
              <a href="https://bulma.io">
                <Image src="/made-with-bulma.png" alt="Made with Bulma" width={256} height={48} />
              </a>
            </Columns.Column>
          </Columns>
        </Content>
      </Container>
    </BulmaFooter>
  );
};

export default Footer;
