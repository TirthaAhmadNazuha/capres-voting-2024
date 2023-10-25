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
  const body = req.body;
  const { voterId, capresId, type } = {
    voterId: body?.voterId,
    capresId: body?.capresId,
    type: body?.type
  };

  switch (type) {
    case 'count':
      return new Response(JSON.stringify({ count: getCountVoters(capresId) }));
    case 'post':
      postVoter(capresId, voterId);
      return new Response(JSON.stringify({ status: 'true' }));
    case 'delete':
      deleteVoter(capresId, voterId);
      return new Response(JSON.stringify({ status: 'true' }));
    case 'find':
      return new Response(JSON.stringify({ capresId: findCapresId(voterId) }));
  }
};
