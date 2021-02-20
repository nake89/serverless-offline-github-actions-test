export async function hello(event) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      hello: "world",
    }),
  };
  return response;
}
export async function goodbye(event) {
  console.log(event);
  const body = JSON.parse(event.body);
  const token = event.headers.Authorization.split(" ")[1];
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      name: body.name + " is joker",
      token: token,
    }),
  };
  return response;
}
