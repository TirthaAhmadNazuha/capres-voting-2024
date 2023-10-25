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
    const result = await (await fetch('.netlify/functions/voters?type=count', {
      method: 'post',
      body: { capresId, type: 'count' }
    })).json();
    console.log(result);
    return Number(result?.count) || 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
};
export const postVoter = async (capresId, voterId) => {
  try {
    await fetch('.netlify/functions/voters?type=post', {
      method: 'post',
      body: JSON.stringify({ voterId, capresId })
    });
  } catch (err) {
    console.error(err);
  }
};
export const deleteVoter = async (capresId, voterId) => {
  try {
    await fetch('.netlify/functions/voters?type=delete', {
      method: 'post',
      body: JSON.stringify({ voterId, capresId })
    });
  } catch (err) {
    console.error(err);
  }
};

export const findCapresId = async (voterId) => {
  try {
    const result = await (await fetch('.netlify/functions/voters?type=find', {
      method: 'post',
      body: JSON.stringify({ voterId })
    })).text();
    return result;
  } catch (err) {
    console.error(err);
    return '';
  }
};
