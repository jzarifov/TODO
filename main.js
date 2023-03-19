// localStorage dan ma'lumotni olish
let tasks = JSON.parse(localStorage.getItem('tasks')) || [] ;

// todo larni sahifaga yozish
function renderTasks(){
    let  tasksList = document.getElementById('task-list');
    tasksList.innerHTML = '';
    for(let i = 0; i < tasks.length; i++){
        let li = document.createElement('li');
        li.innerHTML = tasks[i];
        tasksList.prepend(li);
        let deleteButton = document.createElement('button');
        let updateButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`
        updateButton.innerHTML = `<i class="fas fa-edit"></i>`
        li.appendChild(deleteButton);
        li.appendChild(updateButton);
        deleteButton.addEventListener('click', () => {
            deleteTask(i);
        })
        updateButton.addEventListener('click', () => {
            editTask(i , tasks[i]);
        })
    }
}
renderTasks()


// yangi todo qo'shish

function addTask(){
    let input = document.getElementById('input-task');
    if(input.value.trim() !== ''){
        tasks.push(input.value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        input.value = '';
    }
    renderTasks()
    msg("Ma'lumot qo'shildi")
}

//elem ochiriw

function deleteTask(index){
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    msg('Ma\'lumot o\'chirildi');
}

// elem tahrir

function editTask(index, span){
    let task = tasks[index];
    let newTask = prompt('Tahrirlash', task);
    if(newTask === null){
        return;
    }
    tasks[index] = newTask;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    span.innerContent = newTask;
    renderTasks();
    msg("Ma'lumot tahrirlandi")

}

function msg(xabar){
    let show = document.getElementById('msg');
    show.innerHTML = xabar;
    setTimeout(() => {
        show.innerHTML = ''
        show.style.cssText = ''
    }, 3000)
    show.style.cssText ="padding: 30px 20px; background-color: rgba(9, 212, 9, 0.734); color: #fff; margin: 30px; position: absolute; float: right;"
}
