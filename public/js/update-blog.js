const updateBtn = document.querySelector('#updateBtn');

const updButtonHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-name').value.trim();
  const main = document.querySelector('#blog-text').value.trim();
  const id = document.querySelector('#updateBtn').getAttribute("data-id");

  const formData = { title, main, id };

  if(title && main && id) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

updateBtn.addEventListener('click', updButtonHandler);
