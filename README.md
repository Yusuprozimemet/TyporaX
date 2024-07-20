# TyporaX

## Why TyporaX?

I used to use Typora and loved it for writing simple lab notes with plenty of photos. It provided an amazing experience. Despite its benefits, I always wished Typora had a Grammarly function to correct my English. So, I created TyporaX. It features a Typora-like sidebar where I can view files and search for them using keywords. Additionally, I have integrated Uyghur and Chinese languages into the editor.

<img src="Screenshot_2345.png" alt="Image" style="width:80%;">

You can drag and drop images directly into the markdown editor! More importantly, to satisfy my need for grammar correction, I used the ChatGPT API. Now, I can correct my grammar, ask questions about my text, get summaries, and format the markdown editor for various files.

![Screenshot (2346).png](Screenshot_2346.png)

You can also adjust the image size:

<img src="Screenshot_2347.png" alt="Image" style="width:50%;">

Customize the size easily by changing the percentage width, like `width:10%`. You can center images using the following code:

<p align="center">
<img src="Screenshot_2347.png" alt="Image" style="width:20%;">
</p>

For those who prefer dark mode, I have included both dark and light modes. If you have questions or need assistance, click "Contact" in the Help menu or submit an issue on GitHub. I’ve also added shortcuts to save, delete, rename, and create new files with Ctrl+X, R, D, Q, saving time during editing. Since this is a web app, you can use Ctrl+C and Ctrl+V for copy-pasting text. You can preview markdown text by clicking "Toggle Preview." The Grammarly check feature will surely make you happy. Enjoy writing your text!

Lastly, please register and log in to your account to maintain your privacy. This feature makes TyporaX perfect for writing diaries and keeping memories. I plan to use TyporaX more, which will inspire new features in future updates.

## How to Use This App:
1. Clone the repository:
   ```
   git clone https://github.com/Yusuprozimemet/TyporaX.git
   ```
2. Install the required packages:
   ```
   pip install setup.py
   ```
3. Add your GPT API key to `config.yaml`. Without this key, you cannot use ChatGPT, but other functions will be available.
4. Run the application:
   ```
   cd TyporaX/src
   python app.py
   ```
5. Open your browser and navigate to [http://127.0.0.1:5000/](http://127.0.0.1:5000/). TyporaX will be ready for use.
