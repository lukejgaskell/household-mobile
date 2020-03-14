export async function getHousehold(accessToken) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/houses`, {
    headers: {
      Authorization: accessToken
    }
  });
}

export async function postHousehold(accessToken, name) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/houses`, {
    method: 'POST',
    headers: {
      Authorization: accessToken
    },
    body: JSON.stringify({
      houseName: name
    })
  });
}
