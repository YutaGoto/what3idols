import { BigQuery } from '@google-cloud/bigquery';
import type { NextApiRequest, NextApiResponse } from 'next';

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
  credentials: credential,
});

const idol2map = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as { idols: string[] };
  const query = `select lat, lng
  from \`${process.env.PROJECT_ID}.what3idols.map_idols\`
  where idols = "${body.idols.join(',')}";`;

  const options = {
    query: query,
    jobTimeoutMs: 10000,
  };

  const [job] = await bigquery.createQueryJob(options);
  const [rows] = await job.getQueryResults();

  if (rows.length === 0) {
    return res.status(404).json({ error: 'データが見つかりませんでした' });
  } else if (rows.length > 0) {
    return res.status(200).json(rows[0]);
  } else {
    return res.status(404);
  }
};

export default idol2map;
