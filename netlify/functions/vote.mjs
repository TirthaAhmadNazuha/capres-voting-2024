export const voters = {
  'no-1': {
    nama: 'Ganjar Pranowo',
    votes: new Set()
  },
  'no-2': {
    nama: 'Prabowo Subianto',
    votes: new Set()
  },
  'no-3': {
    nama: 'Anis Baswedan',
    votes: new Set()
  },
};

export const handler = async (req, context) => {
  const { capresId, voterId, type } = JSON.parse(req.body);
  if (type == 'get') return {
    statusCode: 200,
    body: JSON.stringify({
      'no-1': voters['no-1'].votes.size,
      'no-2': voters['no-2'].votes.size,
      'no-3': voters['no-3'].votes.size,
    })
  };

  if (type == 'find') {
    let result = null;
    Object.keys(voters).forEach((key) => {
      if (result == null && voters[key].votes.has(voterId)) {
        result = key;
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ capresId: result })
    };
  }

  if (type == 'post') {
    voters[capresId].votes.add(voterId);
  } else if (type == 'delete') {
    voters[capresId].votes.delete(voterId);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
