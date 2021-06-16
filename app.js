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
          acc[tasks.id] = task;
          return acc;
      }, {});


      const listContainer = document.querySelector('.tasks-list-section .list-group');

      renderAllTasks(objOfTasks);

      function renderAllTasks(tasksList) {
          if (!tasksList) {
              console.error('Передайте список задач!');
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

  })(tasks);