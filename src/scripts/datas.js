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
export const getCountVoters = async (capresId) => {
  try {
    const count = await (await fetch('.netlify/functions/voters', {
      method: 'post',
      body: JSON.stringify({ capresId, type: 'count' })
    })).text();
    return Number(count) || 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
};
export const postVoter = async (capresId, voterId) => {
  try {
    await fetch('.netlify/functions/voters', {
      method: 'post',
      body: JSON.stringify({ voterId, capresId, type: 'post' })
    });
  } catch (err) {
    console.error(err);
  }
};
export const deleteVoter = async (capresId, voterId) => {
  try {
    await fetch('.netlify/functions/voters', {
      method: 'post',
      body: JSON.stringify({ voterId, capresId, type: 'delete' })
    });
  } catch (err) {
    console.error(err);
  }
};

export const findCapresId = async (voterId) => {
  try {
    const result = await (await fetch('.netlify/functions/voters', {
      method: 'post',
      body: JSON.stringify({ voterId, type: 'find' })
    })).text();
    return result;
  } catch (err) {
    console.error(err);
    return '';
  }
};
