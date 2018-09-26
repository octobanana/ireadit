chrome.runtime.onMessage.addListener(
(req, sender, callback) => {
  if (req.type === 'check_history')
  {
    check_history(req.url, callback);
  }
  else
  {
    return false;
  }
  return true;
});

function check_history(url, callback)
{
  chrome.history.getVisits({url: url}, (items) => {
    var res = {url: false};
    if (items != null && items.length > 0)
    {
      res.url = true;
    }
    callback(res);
  });
}
