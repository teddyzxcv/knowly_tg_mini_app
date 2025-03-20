document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const folderList = document.getElementById('folders');
    const articleList = document.getElementById('articles');
    const addBtn = document.getElementById('add-btn');

    let folders = [];
    let articles = [];
    let selectedFolder = null;

    function renderFolders() {
        folderList.innerHTML = '';
        folders.forEach((folder, index) => {
            const li = document.createElement('li');
            li.textContent = folder;
            li.addEventListener('click', () => {
                selectedFolder = index;
                renderArticles();
            });
            folderList.appendChild(li);
        });
    }

    function renderArticles() {
        articleList.innerHTML = '';
        articles.forEach((article, index) => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = article.title;
            link.href = article.link;
            link.target = '_blank';
            li.appendChild(link);

            const deleteArticleBtn = document.createElement('button');
            deleteArticleBtn.textContent = 'Delete';
            deleteArticleBtn.addEventListener('click', () => {
                articles.splice(index, 1);
                renderArticles();
            });
            li.appendChild(deleteArticleBtn);

            articleList.appendChild(li);
        });
    }

    function showAddDialog() {
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
            <form method="dialog">
                <p>Add folder or article?</p>
                <label for="name">Name:</label>
                <input type="text" id="name" placeholder="Enter name"><br><br>
                <label for="link">Link (optional):</label>
                <input type="text" id="link" placeholder="Enter link (optional)"><br><br>
                <button value="folder">Folder</button>
                <button value="article">Article</button>
                <button value="cancel">Cancel</button>
            </form>
        `;
        root.appendChild(dialog);

        dialog.querySelector('button[value="folder"]').addEventListener('click', () => {
            const folderName = dialog.querySelector('#name').value;
            if (folderName) {
                folders.push(folderName);
                renderFolders();
            }
            dialog.close();
        });

        dialog.querySelector('button[value="article"]').addEventListener('click', () => {
            const articleTitle = dialog.querySelector('#name').value;
            const articleLink = dialog.querySelector('#link').value;
            if (articleTitle) {
                articles.push({ title: articleTitle, link: articleLink });
                renderArticles();
            }
            dialog.close();
        });

        dialog.querySelector('button[value="cancel"]').addEventListener('click', () => {
            dialog.close();
        });

        dialog.showModal();
    }

    renderFolders();
    renderArticles();

    addBtn.addEventListener('click', showAddDialog);
});
