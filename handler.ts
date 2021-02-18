export async function hello(event) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event,
      hello: "world"
    })
  }
  return response
}
