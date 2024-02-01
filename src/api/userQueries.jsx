// fetch data from an api

export const getFacts = async () => {
  const response = await fetch("https://cat-fact.herokuapp.com/facts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getFinalizedData = async () => {
  const response = await fetch(`https://zl9fvfkpmk.execute-api.us-east-1.amazonaws.com/Prod/api/contacts`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getUser = async (clerk_id) => {
  const response = await fetch(`/api/general/${clerk_id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getExspouse = async (clerk_id) => {
  const response = await fetch(`/api/family/${clerk_id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateUser = async (clerk_id, userData) => {
  const response = await fetch(`/api/general/${clerk_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: userData.firstName,
      middle_name: userData.middleName,
      last_name: userData.lastName,
      birthday: userData.birthday,
      gender: userData.gender,
      internal_notes: userData.internal_notes,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const updateExspouse = async (clerk_id, userData) => {
  const response = await fetch(`/api/family/exspouse/${clerk_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userData.spouse_id,
      first_name: userData.firstName,
      middle_name: userData.middleName,
      last_name: userData.lastName,
      birthday: userData.birthday,
      gender: userData.gender,
      internal_notes: userData.internal_notes,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const finalizeUserData = async (clerk_id, userData) => {
  const optionsJSON = {
    stored_at: new Date().toISOString(),
    edited_by: clerk_id,
    snapshot_values: {
      first_name: userData.firstName,
      middle_name: userData.middleName,
      last_name: userData.lastName,
      birthday: userData.birthday,
      gender: userData.gender,
      internal_notes: userData.internal_notes,
    },
  };

  const response = await fetch(`/api/general/${clerk_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: userData.firstName,
      middle_name: userData.middleName,
      last_name: userData.lastName,
      birthday: userData.birthday,
      gender: userData.gender,
      internal_notes: userData.internal_notes,
      options: optionsJSON,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// export const updateUser = async (clerk_id, userData) => {
//   // Construct the optionsJSON object
//   const optionsJSON = {
//     modified_at: new Date().toISOString(),
//     edited_by: clerk_id,
//     changed_values: {
//       firstName: {
//         value: userData.firstName,

//       },
//       middleName: userData.middleName,
//       lastName: userData.lastName,
//       birthday: userData.birthday,
//       gender: userData.gender,
//     },
//   };

//   // Make the API request
//   const response = await fetch(`/vault/general/${clerk_id}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       first_name: userData.firstName,
//       middle_name: userData.middleName,
//       last_name: userData.lastName,
//       birthday: userData.birthday,
//       gender: userData.gender,
//       options: optionsJSON, // Include the optionsJSON in the request body
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };
