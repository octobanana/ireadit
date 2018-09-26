var ireadit = {
  link: ''
};
init();

function init()
{
  check_link();
}

function check_link()
{
  let ctx = document.getElementById('siteTable');
  ctx = ctx.firstChild;

  if (! ctx) return;

  let link = ctx.getAttribute('data-url');

  let regex = RegExp('^http[s]{0,1}://[^\r]+$', 'gi');
  let match = regex.test(link);
  if (! match) return;

  ireadit.link = link;
  check_history(link);
}

function check_history(url)
{
  let req = {
    type: 'check_history',
    url: url
  };

  chrome.runtime.sendMessage(req, (res) => {
    if (! res.url)
    {
      hide_comments();
    }
  });
}

function hide_comments()
{
  let ctx = document.getElementsByClassName('commentarea')[0];
  if (ctx)
  {
    let el_msg =
    el('div', [['id', 'ireadit-note']], '', [
      el('p', [], '', ['Comments Hidden by <a href="https://octobanana.com/software/ireadit" title="ireadit">ireadit</a>: Read the <a href="' + ireadit.link + '" title="' + ireadit.link + '">article</a> to view the comment section, or <a href="" title="view comments" id="ireadit-toggle">click here</a>.'])
    ]);
    ctx.insertAdjacentElement("afterend", el_msg);

    let toggle = document.getElementById('ireadit-toggle');
    if (toggle)
    {
      toggle.onclick = () => {
        show_comments();
        return false;
      }
    }
  }

  let el_css = el('style', [['id', 'ireadit-css'], ['type', 'text/css']], `
    #ireadit-note {
      padding: 1rem;
      font-size: 1rem;
    }
    #ireadit-note a {
      cursor: pointer;
      font-weight: bold;
    }
    #ireadit-note a:hover {
      text-decoration: underline;
    }
    .commentarea {
      display: none !important;
    }
    ` , [])
  document.body.appendChild(el_css);
}

function show_comments()
{
  let note = document.getElementById('ireadit-note');
  if (note)
  {
    note.parentNode.removeChild(note);
  }

  let css = document.getElementById('ireadit-css');
  if (css)
  {
    css.parentNode.removeChild(css);
  }
}

function el(tag, attr, text, children)
{
  let root = document.createElement(tag);

  if (text.length > 0)
  {
    let t = document.createTextNode(text);
    root.appendChild(t);
  }

  for (e of attr)
  {
    if (e.length == 1)
    {
      root.setAttribute(e[0], '');
    }
    else if (e.length == 2)
    {
      root.setAttribute(e[0], e[1]);
    }
  }

  for (e of children)
  {
    if (typeof e === 'string' || e instanceof String)
    {
      root.innerHTML += e;
    }
    else
    {
      root.appendChild(e);
    }
  }

  return root;
}
