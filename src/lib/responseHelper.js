const responseHelper = {
  successArray: (dataArray) => {
    if (!Array.isArray(dataArray)) {
      throw new Error("successArray expects an array");
    }
    return new Response(JSON.stringify(dataArray), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  },

  success: (data = {}, msg = "Success") => {
    return new Response(
      JSON.stringify({ success: true, message: msg, ...data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  },

  badRequest: (msg = "Bad Request") => {
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  },

  unauthorized: (msg = "Unauthorized") => {
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  },

  methodNotAllowed: () => {
    return new Response(
      JSON.stringify({ success: false, error: "Method Not Allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  },

  serverError: (msg = "Something went wrong") => {
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  },
};

export default responseHelper;
