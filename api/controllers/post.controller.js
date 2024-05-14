import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;
  let cities;

  if (req.query.cities) {
    cities = req.query.cities.split("-");
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 1000000,
        },
        type: query.type || undefined,
        rooms: parseInt(query.rooms) || undefined,
        city: { in: cities },
        OR: [
          {
            title: {
              contains: query.search || "",
              mode: "insensitive",
            },
          },
          {
            city: {
              contains: query.search || "",
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: query.search || "",
              mode: "insensitive",
            },
          },
        ],
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  //const body = req.body;
  const { images, ...inputsData } = req.body.postData;
  const inputsDetail = req.body.postDetail;
  console.log(images, inputsData, inputsDetail);

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        images,
        ...inputsData,
        postDetail: {
          update: {
            data: {
              ...inputsDetail,
            },
          },
        },
      },
      include: { postDetail: true },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const isAdmin = req.userAdmin;

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!isAdmin) {
      if (post.userId !== tokenUserId) {
        return res.status(403).json({ message: "Not authorized!" });
      }
    }

    await prisma.post.delete({ where: { id } });

    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
