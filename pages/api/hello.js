import {BigQuery} from '@google-cloud/bigquery'

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString()
);

const bigquery = new BigQuery({
  projectId: 'imasparql-slack',
  credentials: credential,
});

const hello = async (req, res) => {
  const idols = req.body
  const query = `select lat, lng
  from \`imasparql-slack.what3idols.maps\`
  where idols = "${idols}";`

  const options = {
    query: query,
    jobTimeoutMs: 2000,
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

export default hello
