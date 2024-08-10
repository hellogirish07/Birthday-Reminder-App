document.addEventListener('DOMContentLoaded', () => {
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const birthdayForm = document.getElementById('birthdayForm');
    const birthdayList = document.getElementById('birthdayList');
    const searchInput = document.getElementById('searchInput');
    const nameInput = document.getElementById('name');
    const dateInput = document.getElementById('date');
    let editIndex = -1;

    const loadBirthdays = () => {
        const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
        birthdayList.innerHTML = '';
        birthdays.forEach((birthday, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${birthday.name} - ${birthday.date}`;
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttons');
            const deleteBtn = document.createElement('button');
            // deleteBtn.textContent = 'Delete';
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            deleteBtn.onclick = () => deleteBirthday(index);
            const editBtn = document.createElement('button');
            // editBtn.textContent = 'Edit';
            editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
            editBtn.classList.add('edit');
            editBtn.onclick = () => editBirthday(index);
            buttonsDiv.appendChild(editBtn);
            buttonsDiv.appendChild(deleteBtn);
            li.appendChild(buttonsDiv);
            birthdayList.appendChild(li);
        });
    };

    const addOrUpdateBirthday = (name, date) => {
        const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
        if (editIndex > -1) {
            birthdays[editIndex] = { name, date };
            editIndex = -1;
        } else {
            birthdays.push({ name, date });
        }
        localStorage.setItem('birthdays', JSON.stringify(birthdays));
        loadBirthdays();
    };

    toggleFormBtn.addEventListener('click', () => {
        if (birthdayForm.classList.contains('show')) {
            birthdayForm.classList.remove('show');
            birthdayForm.style.maxHeight = '0';
        } else {
            birthdayForm.classList.add('show');
            birthdayForm.style.maxHeight = birthdayForm.scrollHeight + 'px';
        }
    });

    birthdayForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const date = dateInput.value;
        addOrUpdateBirthday(name, date);
        birthdayForm.reset();
        birthdayForm.classList.remove('show');
        birthdayForm.style.maxHeight = '0';
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
        birthdayList.innerHTML = '';
        birthdays
            .filter(birthday => birthday.name.toLowerCase().includes(searchTerm))
            .forEach((birthday, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${birthday.name} - ${birthday.date}`;
                const buttonsDiv = document.createElement('div');
                buttonsDiv.classList.add('buttons');
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
                deleteBtn.onclick = () => deleteBirthday(index);
                const editBtn = document.createElement('button');
                editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
                editBtn.classList.add('edit');
                editBtn.onclick = () => editBirthday(index);
                buttonsDiv.appendChild(editBtn);
                buttonsDiv.appendChild(deleteBtn);
                li.appendChild(buttonsDiv);
                birthdayList.appendChild(li);
            });
    });

    const deleteBirthday = (index) => {
        const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
        birthdays.splice(index, 1);
        localStorage.setItem('birthdays', JSON.stringify(birthdays));
        loadBirthdays();
    };

    const editBirthday = (index) => {
        const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
        const birthday = birthdays[index];
        nameInput.value = birthday.name;
        dateInput.value = birthday.date;
        editIndex = index;
        if (!birthdayForm.classList.contains('show')) {
            birthdayForm.classList.add('show');
            birthdayForm.style.maxHeight = birthdayForm.scrollHeight + 'px';
        }
    };

    loadBirthdays();
});
