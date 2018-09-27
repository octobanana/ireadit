# ireadit
A browser extension that hides the comment section of link posts on __reddit__ and __hacker news__ if the article has not been read.

[Click To Watch The Demo](https://octobanana.com/software/ireadit/blob/demo.mp4)

## About
Do you make sure to read the linked article on __reddit__ and __hacker news__ before you read the comments?  
... Of course you do!  
Except for that one time when the top comment was really interesting, and that other time when you wanted to share your experience on the topic of discussion.
Sometimes the comment section can be more exciting and engaging than the article itself.

__ireadit__ helps promote and encourage readers to follow the link and read the article, by hiding the comment section until the article has been read.
If you go to the comment section without having read the article, you will be greeted with a message stating that you have not read the article, and to do so to show the comment section.
After viewing the link, the comment section will be available again.
If you have read the article already on a different browser, you can choose to dismiss __ireadit__, allowing immediate access to the comments.

## How It Works
The extension adds a content script into pages that match one of the following urls:
```
https://news.ycombinator.com/item?id=\*
https://old.reddit.com/r/\*/comments/\*
https://i.reddit.com/r/\*/comments/\*
https://www.reddit.com/r/\*/comments/\*/.compact
https://www.reddit.com/\*
```

The script will first determine if the page is either a text or link post.
If it is a text post, the script will end.
If it finds the page to be a link post, it will try and parse the article link.
If a link is found, the script will send the parsed link to a background script.
The background script is needed to access the browser.history.getVisits() api.
This is also why the extension requires the __history__ permission to function properly.
The background scripts purpose is to look up the given url in the browser history,
and return either a `true` or `false` value back to the content script.
If the content script receives `true`, then the link has been viewed before,
and the script will end.
If the content script receives `false`, then the link has __not__ been viewed before.
To hide the comment section, the script adds a style element to the page changing the elements `display` property to `none`.
Lastly, an element will be inserted where the comment secion was before,
stating that the user has not read the article, and must do so to view the comment section.

## Install From Browser
* Firefox Add-ons - coming soon
* Chrome Web Store - coming soon

## Install Manually

Git clone or download the repository to your computer,
then follow the guide below for your browser.

### Firefox
* Navigate to about:debugging
* Toggle on enable add-on debugging
* Select Load temporary add-on
* Select the extension's directory

### Chrome
* Navigate to chrome://extensions/
* Toggle on developer mode
* Select Load unpacked extension
* Select the extension's directory

### Vivaldi
* Navigate to vivaldi://extensions/
* Toggle on developer mode
* Select Load unpacked extension
* Select the extension's directory
