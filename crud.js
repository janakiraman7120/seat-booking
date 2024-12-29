document.addEventListener('DOMContentLoaded', function() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const form = document.getElementById('crudForm');
    const userIdInput = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const sectionInput = document.getElementById('section');
    const usnInput = document.getElementById('usn');
    const lectureHallInput = document.getElementById('lectureHall');
    const subjectInput = document.getElementById('subject');

    const nameError = document.getElementById('nameError');
    const sectionError = document.getElementById('sectionError');
    const usnError = document.getElementById('usnError');
    const lectureHallError = document.getElementById('lectureHallError');
    const subjectError = document.getElementById('subjectError');

    const submitBtn = document.getElementById('submitBtn');
    const userTable = document.getElementById('userTable').querySelector('tbody');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            const id = userIdInput.value;
            const name = nameInput.value;
            const section = sectionInput.value;
            const usn = usnInput.value;
            const lectureHall = lectureHallInput.value;
            const subject = subjectInput.value;

            if (id) {
                // Update user
                const index = users.findIndex(user => user.id === id);
                users[index] = { id, name, section, usn, lectureHall, subject };
            } else {
                // Create user
                users.push({ id: Date.now().toString(), name, section, usn, lectureHall, subject });
            }

            localStorage.setItem('users', JSON.stringify(users));
            form.reset();
            userIdInput.value = '';
            submitBtn.textContent = 'Add';
            renderUsers();

            // Redirect to index1.html after 1 second
            setTimeout(function() {
                window.location.href = "index1.html"; 
            }, 1000);
        }
    });

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        if (sectionInput.value.trim() === '') {
            sectionError.textContent = 'Section is required';
            isValid = false;
        } else {
            sectionError.textContent = '';
        }

        if (usnInput.value.trim() === '') {
            usnError.textContent = 'USN is required';
            isValid = false;
        } else {
            usnError.textContent = '';
        }

        if (lectureHallInput.value.trim() === '') {
            lectureHallError.textContent = 'Lecture Hall Number is required';
            isValid = false;
        } else {
            lectureHallError.textContent = '';
        }

        if (subjectInput.value.trim() === '') {
            subjectError.textContent = 'Subject is required';
            isValid = false;
        } else {
            subjectError.textContent = '';
        }

        return isValid;
    }

    function renderUsers() {
        userTable.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.section}</td>
                <td>${user.usn}</td>
                <td>${user.lectureHall}</td>
                <td>${user.subject}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                editUser(btn.dataset.id);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                deleteUser(btn.dataset.id);
            });
        });
    }

    function editUser(id) {
        const user = users.find(user => user.id === id);
        userIdInput.value = user.id;
        nameInput.value = user.name;
        sectionInput.value = user.section;
        usnInput.value = user.usn;
        lectureHallInput.value = user.lectureHall;
        subjectInput.value = user.subject;
        submitBtn.textContent = 'Update';
    }

    function deleteUser(id) {
        users = users.filter(user => user.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsers();
    }

    renderUsers();
});
