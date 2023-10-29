
import { writeFile, readFile } from 'fs/promises';

const saveToFlie = async (voters) => {
  let dataVoters = JSON.stringify(voters);
  await writeFile('./public/data-vote.json', dataVoters, 'utf-8');
};

export const handler = async (req, context) => {
  const { capresId, voterId, type } = JSON.parse(req.body);
  /**@type {Object<string, { votes: string[] }>} */
  const voters = JSON.parse(await readFile('./public/data-vote.json', 'utf-8'));
  if (type == 'get') return {
    statusCode: 200,
    body: JSON.stringify({
      'no-1': voters['no-1'].votes.length,
      'no-2': voters['no-2'].votes.length,
      'no-3': voters['no-3'].votes.length,
    })
  };

  if (type == 'find') {
    let result = null;
    Object.keys(voters).forEach((key) => {
      if (result == null && voters[key].votes.find((id) => id == voterId)) {
        result = key;
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ capresId: result })
    };
  }

  if (type == 'post') {
    voters[capresId].votes.push(voterId);
  } else if (type == 'delete') {
    voters[capresId].votes.splice(voters[capresId].votes.findIndex((id) => id == voterId));
  }
  saveToFlie(voters);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
