export async function getInvites(idToken, invite) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/invites`, {
    headers: {
      Authorization: idToken
    }
  });
}

export async function postInvite(idToken, invite) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/invites`, {
    method: 'POST',
    headers: {
      Authorization: idToken
    },
    body: JSON.stringify(invite)
  });
}

export async function deleteInvite(idToken, invite) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/invites`, {
    method: 'DELETE',
    headers: {
      Authorization: idToken
    },
    body: JSON.stringify(invite)
  });
}
