export async function getUser(idToken) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/users`, {
    headers: {
      Authorization: idToken
    }
  });
}

export async function updateUser(idToken) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/users`, {
    method: 'POST',
    headers: {
      Authorization: idToken
    }
  });
}
