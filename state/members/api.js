export async function getMembers(accessToken) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/members`, {
    headers: {
      Authorization: accessToken
    }
  });
}

export async function postMember(accessToken, member) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/members`, {
    method: 'POST',
    headers: {
      Authorization: accessToken
    },
    body: JSON.stringify(member)
  });
}

export async function deleteMember(accessToken, member) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/members`, {
    method: 'DELETE',
    headers: {
      Authorization: accessToken
    },
    body: JSON.stringify(member)
  });
}
