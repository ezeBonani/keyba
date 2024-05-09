import apiRequest from "./apiRequest";

//loader para hacer el fetch de cada post
//se utiliza en los paths de react router
export const singlePageLoader = async ({ request, params }) => {
  try {
    const res = await apiRequest("/posts/" + params.id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  try {
    const res = await apiRequest("/posts?" + query);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const profilePageLoader = async () => {
  try {
    const res = await apiRequest("/user/profilePosts");
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Response("Sesión caducada, por favor volver a Logearse", {
        status: 401,
      });
    }
    throw new Response(error.response.data.message);
  }
};

export const updatePostLoader = async ({ request, params }) => {
  try {
    const res = await apiRequest("/posts/" + params.id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
