import Head from 'next/head';
import type { FC } from 'react';

interface Props {
  description: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const Meta: FC<Props> = ({ description, noindex = false, nofollow = false }) => {
  return (
    <Head>
      <meta property="og:title" content="What3Idols" />
      <meta property="og:description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {nofollow && <meta name="robots" content="nofollow" />}
      <title>What3Idols!</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
  );
};

export default Meta;
