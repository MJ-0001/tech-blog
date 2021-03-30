const updateBtn = document.querySelector('#updateBtn');

const updBtnHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-name').value.trim();
    const main = document.querySelector('#blog-text').value.trim();
    const id = document.querySelector('#updateBtn').getAttribute("data-id");

    const formData = { title, main };

    if(title && main) {
        const response = await fetch('/api/blogs/' + id, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            document.location.replace('/api/blogs/');
        } else {
            alert(response.statusText);
        }
    }
}
updateBtn.addEventListener('click', updBtnHandler);