const tasks = [
    {
      id: '5d2ca9e2e03d40b326596aa7',
      completed: true,
      body:
        'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
      title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
  ];
  
  (function(arrOfTasks) {
      const objOfTasks = arrOfTasks.reduce((acc, task) => {
          acc[task.id] = task;
          return acc;
      }, {});


      const listContainer = document.querySelector('.tasks-list-section .list-group');


        //   add task
      const form = document.forms['addTask'];
      const inputTitle = form.elements['title'];
      const inputBody = form.elements['body'];

        //  events
      renderAllTasks(objOfTasks);
      form.addEventListener('submit', onformSubmitHandler);
      listContainer.addEventListener('click', onDeleteHandler); 



      function renderAllTasks(tasksList) {
          if (!tasksList) {
              console.error('Submit your task list!');
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        });
        listContainer.appendChild(fragment);
      }

      function listItemTemplate({ id, title, body} = {} ) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
        li.setAttribute('data-task-id', id);
       
        const span = document.createElement('span');
        span.textContent = title;
        span.style.fontWeight = 'bold';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete task';
        deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

        const article = document.createElement('p');
        article.textContent = body;
        article.classList.add('mt-2', 'w-100'); 

        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(article);
            
        return li;
      }

   function onformSubmitHandler(e) {
       e.preventDefault();
       const titleValue = inputTitle.value;
       const bodyValue = inputBody.value;
       
       if(!titleValue || !bodyValue) {
           alert('Please, enter title and body');
           return;
       }

       const task = createNewTask(titleValue, bodyValue);
       const listItem = listItemTemplate(task);
       listContainer.insertAdjacentElement('afterbegin', listItem);
       form.reset();
   }

   function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            id: `task-${Math.random()}`,
        };
        objOfTasks[newTask.id] = newTask;
        return {...newTask};
   }

        //    deleteTask
   function deleteTask(idElement) {
       const {title} = objOfTasks[idElement]
    const isConfirm = confirm(`delete task: ${title} ?`);
        if (!isConfirm) return;
        delete objOfTasks[idElement];
        return isConfirm;
   } 

   function deleteTaskFromHTML(confirmed, el) {
       if (!confirmed) return;
       el.remove();
   }

   function onDeleteHandler({target}) {
        if (target.classList.contains('delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const idElement = parent.dataset.taskId;
            const confirmed = deleteTask(idElement);
            deleteTaskFromHTML(confirmed, parent);
        }
    }

})(tasks);