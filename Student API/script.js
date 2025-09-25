const API = 'https://studentapi-m7a7.onrender.com';

let editingId = null;
let studentsList = [];

const yearMap = {
	"1": "First Year",
	"2": "Second Year",
	"3": "Third Year",
	"4": "Fourth Year"
};


const form = document.getElementById('student-form');
const cancelBtn = document.getElementById('cancel-btn');
const submitBtn = document.getElementById('submit-btn');
const formTitle = document.getElementById('form-title');
const loading = document.getElementById('loading');
const studentsContainer = document.getElementById('students-container');

const fields = {
	studentName: document.getElementById('studentName'),
	college: document.getElementById('college'),
	cgpa: document.getElementById('cgpa'),
	phone: document.getElementById('phone'),
	sapid: document.getElementById('sapid'),
	batch: document.getElementById('batch'),
	year: document.getElementById('year'),
	address: document.getElementById('address'),
};


function init() {
	loadStudents();
	form.addEventListener('submit', onSubmit);
	cancelBtn.addEventListener('click', onCancel);
}


function onSubmit(e) 
{
	e.preventDefault();
	if (editingId) updateStudent();
	else addStudent();
}


function onCancel() 
{
	editingId = null;
	resetForm();
	setFormMode(false);
}


async function loadStudents() 
{
	toggleLoading(true);
	try {
		const res = await fetch(`${API}/student/all`);
		const data = await res.json();

		if (!res.ok) throw new Error(data.message);

		studentsList = data.students || [];
		renderStudents();
	} 
    catch (e) 
    {
		alert('Loading error: ' + e.message);
	}
	toggleLoading(false);
}


function renderStudents() 
{
	if (studentsList.length === 0) 
    {
		studentsContainer.innerHTML = "No students found.";
		return;
	}

	let html = `<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>College</th>
				<th>CGPA</th>
				<th>Phone</th>
				<th>SAP ID</th>
				<th>Batch</th>
				<th>Year</th>
				<th>Address</th>
				<th>Actions</th>
			</tr>
		</thead>`;

	studentsList.forEach(student => {
		html += `<tr>
			<td>${student.studentName || ''}</td>
			<td>${student.college || ''}</td>
			<td>${student.cgpa || ''}</td>
			<td>${student.phone || ''}</td>
			<td>${student.sapid || ''}</td>
			<td>${student.batch || ''}</td>
			<td>${student.year || ''}</td>
			<td>${student.address || ''}</td>
			<td>
				<button onclick="startEdit('${student._id}')">Edit</button>
				<button onclick="startDelete('${student._id}')">Delete</button>
			</td>
		</tr>`;
	});

	html += '</table>';
	studentsContainer.innerHTML = html;
}


function getFormData() 
{
	return {
		studentName: fields.studentName.value,
		college: fields.college.value,
		cgpa: parseFloat(fields.cgpa.value),
		phone: fields.phone.value,
		sapid: fields.sapid.value,
		batch: fields.batch.value,
		year: yearMap[fields.year.value],
		address: fields.address.value,
	};
}


function validateData(data) 
{
	if (!data.studentName || !data.college || isNaN(data.cgpa) || !data.phone || !data.sapid || !data.batch || !data.year || !data.address) 
	{
		alert('Please fill all fields correctly.');
		return false;
	}

	for (let s of studentsList) {
		if (s.sapid === data.sapid && s._id !== editingId) 
		{
			alert('SAP ID already exists. Use a unique one.');
			return false;
		}
	}
	return true;
}


async function addStudent() 
{
	const data = getFormData();

	if (!validateData(data)) return;

	try 
    {
		const response = await fetch(`${API}/student/add`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			}
		);

		const result = await response.json();

		if (!response.ok) 
		{
			alert('Error: ' + result.message);
			return;
		}

		alert('Student added!');
		resetForm();
		loadStudents();
	}

	catch(error) 
    {
		alert('Add error: ' + error.message);
	}
}


startEdit = function (id) 
{
	let student = null;
	for (let i = 0; i < studentsList.length; i++) 
    {
		if (studentsList[i]._id === id) 
        {
			student = studentsList[i];
			break;
		}
	}
	if (!student) return;

	editingId = id;

	fields.studentName.value = student.studentName;
	fields.college.value = student.college;
	fields.cgpa.value = student.cgpa;
	fields.phone.value = student.phone;
	fields.sapid.value = student.sapid;
	fields.batch.value = student.batch;

	const reverseYearMap = {
		"First Year": "1",
		"Second Year": "2",
		"Third Year": "3",
		"Fourth Year": "4"
	};
	fields.year.value = reverseYearMap[student.year] || '';

	fields.address.value = student.address || '';

	setFormMode(true);
};


async function updateStudent() {
	const data = getFormData();
	if (!validateData(data)) return;

	try 
    {
		let res = await fetch(`${API}/student/update/${editingId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		let resData = await res.json();
		if (!res.ok) throw new Error(resData.message);
		alert('Student updated!');
		editingId = null;
		resetForm();
		setFormMode(false);
		loadStudents();
	} 
    catch (e) 
    {
		alert('Update error: ' + e.message);
	}
}


window.startDelete = function (id) {
	if (!confirm('Are you sure you want to delete this student?')) return;

	fetch(`${API}/student/delete/${id}`, { method: 'DELETE' })
		.then(res => res.json())
		.then(data => {
			alert(data.message || 'Deleted');
			loadStudents();
		})
		.catch(e => alert('Delete error: ' + e.message));
};


function resetForm() {
	form.reset();
}


function toggleLoading(show) {
	loading.style.display = show ? 'block' : 'none';
}


function setFormMode(editing) 
{
	formTitle.textContent = editing ? 'Edit Student' : 'Add Student';
	submitBtn.textContent = editing ? 'Update' : 'Add';
	cancelBtn.style.display = editing ? 'inline' : 'none';
}

init();
