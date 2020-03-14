export async function getChores(accessToken) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/activity`, {
    headers: {
      Authorization: accessToken
    }
  });
}

export async function postChore(accessToken, chore) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/chores`, {
    method: 'POST',
    headers: {
      Authorization: accessToken
    },
    body: JSON.stringify(chore)
  });
}

export async function deleteChore(accessToken, chore) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/chores`, {
    method: 'DELETE',
    headers: {
      Authorization: accessToken
    },
    body: JSON.stringify(chore)
  });
}
