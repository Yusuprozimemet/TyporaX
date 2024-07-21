# TyporaX: The Magic of Markdown, Upgraded

## Why TyporaX?

Once upon a time, I was a devoted Typora user. Typora was my go-to for crafting simple lab notes, rich with images and ideas. Its seamless interface made writing a breeze. However, there was always a small wish—a desire for a Grammarly-like feature to polish my English. And thus, TyporaX was born.

Imagine a Typora experience, but with a twist. I’ve woven a Typora-like sidebar into the mix, letting you browse files with ease, searching by the keywords you type. And because I believe in inclusivity, I’ve added support for Uyghur and Chinese languages right in the editor. 🌟

![Image showing TyporaX sidebar](./static/img/Screenshot_2345.png)

Dropping images directly into the markdown editor? Absolutely. And for my grammar-savvy side, I’ve integrated the ChatGPT API. Now, you can ask for grammar checks, text summaries, and markdown formatting as much as you want. You can even tweak the editor’s settings for various file types. Just look at this:

![Example image for markdown adjustments](./static/img/Screenshot_2346.png)

Need to resize an image? Just adjust the width percentage:

<img src="./static/img/Screenshot_2347.png" alt="Image" style="width:50%;">

Or center it with a simple tweak:

<p align="center">
<img src="./static/img/Screenshot_2347.png" alt="Image" style="width:20%;">
</p>

And for those who cherish the night, TyporaX comes with a chic dark mode, alongside the classic day mode. Stuck or need help? Hit the “Contact” button in the Help menu or report an issue on GitHub. Plus, handy shortcuts like Ctrl+X, R, D, Q for saving, deleting, renaming, or creating files will streamline your editing workflow. And yes, Ctrl+C and V are at your disposal for effortless copy-pasting. Isn’t that a dream?

Markdown text preview? Just click “Toggle Preview”. The Grammarly check should make your heart sing with joy. I hope TyporaX becomes your favorite tool for jotting down notes, writing diaries, and capturing memories. I’ll be diving into TyporaX myself, dreaming up new features as I go. The adventure is just beginning!

## Quick Start Guide:

1. Clone the repository: `git clone https://github.com/Yusuprozimemet/TyporaX.git`
2. Install dependencies: `pip install setup.py`
3. Add your GPT API key to `config.yaml`. Without it, ChatGPT features won’t work, but you can still enjoy other functionalities.
4. Navigate to TyporaX/src in your terminal and run: `python app.py`
5. Open your browser (Google Chrome or any other) and head to http://127.0.0.1:5000/. TyporaX is ready to use! 🚀

Enjoy the magic of TyporaX, and may your writing journey be smooth and inspiring!

Make sure the image files (`Screenshot_2345.png`, `Screenshot_2346.png`, `Screenshot_2347.png`) are located in the `static/img/` directory within your project so TyporaX can load them correctly. If the images are hosted online, replace the local paths with the correct URLs.