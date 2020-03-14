export async function getActivity(accessToken) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/activity`, {
    headers: {
      Authorization: accessToken
    }
  });
}

export async function postActivity(accessToken, activity) {
  return await fetch(`https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/activity`, {
    method: 'POST',
    headers: {
      Authorization: accessToken
    },
    body: JSON.stringify(activity)
  });
}
