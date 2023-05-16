/* this file is used for calling the apis */

//this function fetch the data from server
export const getData = async () => {
  let result = { response: "error", data: [] };
  await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => {
      result = { response: "success", data: json };
    });

  return result;
};

//this is just a dummy call to delete data
export const deleteData = async (id) => {
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE",
  });
};

//this is just a dummy call to update data
export const updateData = async (user) => {
  let result = { response: "error", data: [] };
  const id = user.id;
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      user,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      result = { response: "success" };
      console.log(json);
    });

  return result;
};

//this is just a dummy call to add data
export const addData = async (user) => {
  let result = { response: "error", data: [] };
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      user,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      result = { response: "success", data: json };
      console.log(json);
    });

  return result;
};
