const responseHelper = {
  success: (data = {}, msg = 'Success') => {
    return Response.json({ success: true, message: msg, ...data }, { status: 200 });
  },

  badRequest: (msg = 'Bad Request') => {
    return Response.json({ success: false, error: msg }, { status: 400 });
  },

  unauthorized: (msg = 'Unauthorized') => {
    return Response.json({ success: false, error: msg }, { status: 401 });
  },

  methodNotAllowed: () => {
    return Response.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
  },

  serverError: (msg = 'Something went wrong') => {
    return Response.json({ success: false, error: msg }, { status: 500 });
  },
};

export default responseHelper;
