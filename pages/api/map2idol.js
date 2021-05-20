import {BigQuery} from '@google-cloud/bigquery'

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

const bigquery = new BigQuery({
  projectId: 'imasparql-slack',
  credentials: credential,
});

const map2idol = async (req, res) => {
  const latlng = JSON.parse(req.body)
  const query = `select lat, lng, idols
  from \`imasparql-slack.what3idols.maps\`
  where lat between ${latlng.lat - 0.0113} and ${latlng.lat}
  and lng between ${latlng.lng - 0.0121} and ${latlng.lng}
  ;`

  const options = {
    query: query,
    jobTimeoutMs: 10000,
  };

  const [job] = await bigquery.createQueryJob(options);
  const [rows] = await job.getQueryResults();

  if (rows.length === 0){
    return res.status(404)
  } else if (rows.length > 0){
    return res.status(200).json(rows[0])
  } else {
    return res.status(404)
  }
}

export default map2idol
