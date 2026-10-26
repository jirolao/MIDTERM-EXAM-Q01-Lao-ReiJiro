const URL = '/api/requests';

document.getElementById('refreshBtn').addEventListener('click', loadAll);
document.getElementById('addBtn').addEventListener('click', addOne);
document.getElementById('searchBtn').addEventListener('click', searchOne);
document.getElementById('deleteBtn').addEventListener('click', deleteOne);

async function loadAll() {
  const res = await fetch(URL);
  const data = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = '';
  
  data.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `ID: ${item.id} | ${item.requester} | ${item.location} | ${item.problem} | Prio: ${item.priority} | Status: ${item.status}`;
    if (item.priority === 'High') {
      li.classList.add('high-priority');
    }
    list.appendChild(li);
  });
}

async function addOne() {
  await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requester: document.getElementById('req').value,
      location: document.getElementById('loc').value,
      problem: document.getElementById('prob').value,
      priority: document.getElementById('prio').value
    })
  });
  loadAll();
}

async function searchOne() {
  const id = document.getElementById('searchId').value;
  const res = await fetch(`${URL}/${id}`);
  const data = await res.json();
  document.getElementById('result').textContent = JSON.stringify(data, null, 2);
}

async function deleteOne() {
  const id = document.getElementById('searchId').value;
  await fetch(`${URL}/${id}`, { method: 'DELETE' });
  loadAll();
}

loadAll();
