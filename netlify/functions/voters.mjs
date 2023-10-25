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
    const body = JSON.parse(req.body);
    const { voterId, capresId, type } = {
      voterId: body?.voterId,
      capresId: body?.capresId,
      type: body?.type
    };

    switch (type) {
      case 'count':
        return Response.json({ count: getCountVoters(capresId).toString() });
      case 'post':
        postVoter(capresId, voterId);
        return Response.json({ status: 'true' });
      case 'delete':
        deleteVoter(capresId, voterId);
        return Response.json({ status: 'true' });
      case 'find':
        return Response.json({ capresId: findCapresId() });
    }
  } catch (error) {
    return Response.json({ error, params: context.params, result: req.body });
  }
};
