import { BigQuery } from '@google-cloud/bigquery';

import { LatLng } from '../../types/Type';

import type { NextApiRequest, NextApiResponse } from 'next';

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS as string, 'base64').toString()
);

const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
  credentials: credential,
});

const map2idol = async (req: NextApiRequest, res: NextApiResponse) => {
  const latlng: LatLng = JSON.parse(req.body);
  const query = `select lat, lng, idols
  from \`${process.env.PROJECT_ID}.what3idols.map_idols\`
  where lat between ${latlng.lat - 0.004} and ${latlng.lat}
  and lng between ${latlng.lng - 0.005} and ${latlng.lng}
  ;`;

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

export default map2idol;
