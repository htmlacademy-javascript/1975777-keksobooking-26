const getPostsFromServer = async () => await fetch('https://26.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json());

const createPost = (data) => fetch('https://26.javascript.pages.academy/keksobooking',
  {
    method: 'POST',
    body: new FormData(data),
  })
  .then((response) => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return Promise.resolve(response.json());
  });

export {getPostsFromServer, createPost};
