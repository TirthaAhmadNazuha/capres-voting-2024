const capres = {
  'no-1': {
    nama: 'Ganjar Pranowo',
    voters: new Set()
  },
  'no-2': {
    nama: 'Prabowo Subianto',
    voters: new Set()
  },
  'no-3': {
    nama: 'Anis Baswedan',
    voters: new Set()
  },
};

const getCountVoters = (capresId) => capres[capresId].voters.size;
const postVoter = (capresId, voterId) => {
  capres[capresId].voters.add(voterId);
};
const deleteVoter = (capresId, voterId) => {
  capres[capresId].voters.delete(voterId);
};
const findCapresId = (voterId) => {
  return Object.keys(capres).find((ids) => capres[ids].voters.has(voterId));
};

export default async (req, context) => {
  try {
    const { type } = context.params;
    const body = JSON.parse(req.body);
    const { voterId, capresId } = {
      voterId: body?.voterId,
      capresId: body?.capresId,
    };

    switch (type) {
      case 'count':
        return getCountVoters(capresId);
      case 'post':
        postVoter(capresId, voterId);
        break;
      case 'delete':
        deleteVoter(capresId, voterId);
        break;
      case 'find':
        return findCapresId();
    }
  } catch (error) {
    return JSON.stringify({ error, params: context.params, result: req.body });
  }
};

export const config = {
  path: '/voter-api/:type'
};
