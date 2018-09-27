var ireadit = {
  url: location.pathname,
  link: '',
  hidden: false
};
init();

function init()
{
  handle_events();
}

function handle_events()
{
  document.body.addEventListener('click', () => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        ireadit.hidden = false;
        check_pathname();
      }, 600);
    });
  }, true);
}

function check_pathname()
{
  if (ireadit.url === location.pathname) return;
  ireadit.url = location.pathname;
  check_link();
}

function check_link()
{
  let ctx = document.getElementsByClassName('_2MkcR85HDnYngvlVW2gMMa')[0];

  if (! ctx) return;
  if (! ctx.firstChild) return;
  ctx = ctx.firstChild;

  if (ctx.tagName !== 'A') return;
  if (ctx.href === '') return;

  let link = ctx.href;
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
      ireadit.hidden = true;
    }
  });
}

function hide_comments()
{
  let ctx = document.getElementById('overlayScrollContainer');
  if (! ctx) return;
  ctx = ctx.firstChild;
  if (! ctx) return;
  ctx = ctx.firstChild;
  if (! ctx) return;

  let el_css = el('style', [['id', 'ireadit-css'], ['type', 'text/css']], `
    #ireadit-note {
      padding: 1rem;
      margin-left: 2rem;
      font-size: 1rem;
      font-weight: normal;
      display: inline-block;
    }
    #ireadit-note a {
      cursor: pointer;
      font-weight: bold;
    }
    #ireadit-note a:hover {
      text-decoration: underline;
    }
    .` + ctx.classList.item(0) + `>*:not(:first-child):not(:last-child) {
      display: none !important;
    }
    ` , [])

  let el_msg =
  el('div', [['id', 'ireadit-note'], ['class', get_text_class()]], '', [
    el('p', [], '', ['Comments Hidden by <a href="https://octobanana.com/software/ireadit" title="ireadit">ireadit</a>: Read the <a href="' + ireadit.link + '" title="' + ireadit.link + '">article</a> to view the comment section, or <a href="" title="view comments" id="ireadit-toggle">click here</a>.']),
    el_css
  ]);

  ctx.appendChild(el_msg);

  let toggle = document.getElementById('ireadit-toggle');
  if (toggle)
  {
    toggle.onclick = () => {
      show_comments();
      ireadit.hidden = false;
      return false;
    }
  }

  let overlay = document.getElementById('overlayScrollContainer');
  if (overlay)
  {
    overlay.scrollTop = 0;
  }
}

function get_text_class()
{
  let ctx = document.getElementById('overlayScrollContainer');
  if (! ctx) return '';

  ctx = ctx.getElementsByTagName('h2')[0];
  if (! ctx) return '';

  let style_class = ctx.classList.item(1);
  if (! style_class) return '';

  return style_class;
}

function show_comments()
{
  let note = document.getElementById('ireadit-note');
  if (note)
  {
    note.parentNode.removeChild(note);
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
