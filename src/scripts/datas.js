export const capres = {
  'no-1': {
    nama: 'Ganjar Pranowo',
    partai: 'Partai Demokrasi Indonesia Perjuangan (PDI Perjuangan)',
    image: 'ganjar-pranowo.webp',
  },
  'no-2': {
    nama: 'Prabowo Subianto',
    partai: 'Partai Gerakan Indonesia Raya (Gerindra)',
    image: 'Prabowo-Subianto-Djojohadikusumo.webp',
  },
  'no-3': {
    nama: 'Anis Baswedan',
    partai: 'Independen',
    image: 'Anies-Rasyid-Baswedan.webp',
  },
};
export const getCountVoters = async () => {
  const result = await (await fetch('.netlify/functions/vote', {
    method: 'post',
    body: JSON.stringify({ type: 'get' })
  })).json();
  return result;
};
export const postVoter = async (capresId, voterId) => {
  await fetch('.netlify/functions/vote', {
    method: 'post',
    body: JSON.stringify({ capresId, voterId, type: 'post' }),
  });
};
export const deleteVoter = async (capresId, voterId) => {
  await fetch('.netlify/functions/vote', {
    method: 'post',
    body: JSON.stringify({ capresId, voterId, type: 'delete' })
  });
};

export const findVoter = async (voterId) => {
  const result = await (await fetch('.netlify/functions/vote', {
    method: 'post',
    body: JSON.stringify({ voterId, type: 'find' })
  })).json();
  return result;
}

