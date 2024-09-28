type Method = "GET" | "POST" | "DELETE" | "PUT";

const handler = async (req: Request) => {
  const method: Method = req.method as Method;
  // const url = req.url.split("http://localhost:5000")[1];
  const url = new URLPattern(req.url).pathname;

  if (url === "/api/v1/users") {
    switch (method) {
      case "GET": {
        const usersData = [{ name: "sabbir", age: 20 }];
        return new Response(JSON.stringify(usersData), { status: 200 });
      }

      case "POST": {
        const requestBody = await req.json();
        return new Response(
          JSON.stringify({
            message: "Account created!",
            user: requestBody,
          }),
          {
            status: 201,
          }
        );
      }

      case "DELETE": {
        return new Response(JSON.stringify("hello delete"), { status: 200 });
      }

      case "PUT": {
        return new Response(JSON.stringify("put"), { status: 200 });
      }

      default:
        return new Response("invalid url");
    }
  }

  return new Response("hello", {
    status: 200,
  });
};

Deno.serve({ port: 5000 }, handler);
