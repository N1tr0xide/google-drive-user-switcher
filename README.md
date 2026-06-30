# google-drive-user-switcher

*FOR FIREFOX ONLY!*

If you’ve ever tried switching Google Drive accounts while browsing a shared folder, you already know the experience. You click “Switch account,” expecting a smooth transition, and Google Drive responds like: “Oh, you wanted to stay in that folder? Nah.”

Suddenly you’re teleported back to the Drive homepage like you’ve been evicted from your own house. The public folder you were in? Gone. The shared directory you needed? Vanished. The link you were following? Obliterated. If you juggle multiple accounts; personal, work, client, burner, secret‑project‑you‑swear‑you’ll-finish-one-day, switching accounts becomes a mini‑game of “Find the folder you were JUST in.” Spoiler: you lose every time.

So i made this extension to do this very specific thing: switching Google Drive accounts without Drive yeeting you back to the homepage like you’ve committed a crime. Technically, Google does let you switch accounts inside a URL. All you have to do is manually edit the link:

    https://drive.google.com/drive/u/0/folders/whatever

and change the 0 to a 1 or 2 or whatever account you want. Or you could write your email manually like this:

    https://drive.google.com/drive/u/0/folders/whatever?authuser=yourname@gmail.com

Because nothing says “modern cloud computing” like hand‑editing a URL parameter. I mean It works! It’s just annoying, repetitive and easy to mess up.

So this extension makes it easier with just this steps:
- Write your email once.
- Click it.
- Done.
