document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('content-form');
    const contentList = document.getElementById('content-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (title && content) {
            saveContent(title, content);
            form.reset();
        }
    });

    function saveContent(title, content) {
        fetch('http://localhost:3000/api/contents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            addContent(title, content);
        });
    }

    function addContent(title, content) {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        const spanText = document.createElement('span');
        spanText.textContent = `${title} - ${content}`;

        const button = document.createElement('button');
        button.className = 'btn btn-remove btn-sm';
        button.textContent = 'Remove';

        button.addEventListener('click', () => {
            contentList.removeChild(li);
        });

        li.appendChild(spanText);
        li.appendChild(button);
        contentList.appendChild(li);
    }

    function loadContents() {
        fetch('http://localhost:3000/api/contents')
        .then(response => response.json())
        .then(data => {
            data.forEach(content => addContent(content.title, content.content));
        });
    }

    loadContents();
});
