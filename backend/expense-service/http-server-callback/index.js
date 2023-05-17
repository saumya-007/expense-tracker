module.exports = function makeHttpCallBack(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      file: req.file ? req.file : null,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        console.info(httpResponse);
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) => res.status(500).send(e));
  };
};
