export const handler = async (req, context) => {
  console.dir(req);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!",
    })
  };
};
