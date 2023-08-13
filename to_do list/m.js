(function() {
    'use strict';
    var tasker = {
      init: function() {
        this.cacheDom();
        this.bindEvents();
        this.evalTasklist();
      },
      cacheDom: function() {
        this.taskInput = document.getElementById("input-task");
        this.addBtn = document.getElementById("add-task");
        this.tasklist = document.getElementById("tasks");
        this.tasklistChildren = this.tasklist.children;
        this.errorMessage = document.getElementById("error");
      },
      bindEvents: function() {
        this.addBtn.onclick = this.addTask.bind(this);
        this.taskInput.onkeypress = this.enterKey.bind(this);
  
        for (var i = 0; i < this.tasklistChildren.length; i++) {
          var editBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
          editBtn.onclick = this.editTask.bind(this, i);
  
          var delBtn = this.tasklistChildren[i].getElementsByTagName("button")[1];
          delBtn.onclick = this.delTask.bind(this, i);
        }
      },
      evalTasklist: function() {
        var i, chkBox, editBtn, delBtn;
        for (i = 0; i < this.tasklistChildren.length; i += 1) {
          chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
          chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);
  
          editBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
          editBtn.onclick = this.editTask.bind(this, this.tasklistChildren[i]);
  
          delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
          delBtn.onclick = this.delTask.bind(this, i);
        }
      },
      render: function() {
        var taskLi, taskChkbx, taskInput, taskBtn, taskTrsh, taskTimestamp;
        taskLi = document.createElement("li");
        taskLi.setAttribute("class", "task");
        taskChkbx = document.createElement("input");
        taskChkbx.setAttribute("type", "checkbox");
        taskInput = document.createElement("input");
        taskInput.setAttribute("type", "text");
        taskInput.value = this.taskInput.value;
        taskBtn = document.createElement("button");
        taskTrsh = document.createElement("i");
        taskTrsh.setAttribute("class", "fa fa-trash");
        taskTimestamp = document.createElement("span");
        taskTimestamp.innerText = this.getTimestamp(); // Get the current timestamp
  
        taskBtn.appendChild(taskTrsh);
  
        taskLi.appendChild(taskChkbx);
        taskLi.appendChild(taskInput);
        taskLi.appendChild(taskBtn);
        taskLi.appendChild(taskTimestamp); // Append the timestamp element
  
        this.tasklist.appendChild(taskLi);
      },
      getTimestamp: function() {
        var now = new Date();
        var hours = now.getHours().toString().padStart(2, "0");
        var minutes = now.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
      },
      completeTask: function(i, chkBox) {
        var taskInput = this.tasklistChildren[i].getElementsByTagName("input")[1];
        if (chkBox.checked) {
          taskInput.disabled = true;
          this.tasklistChildren[i].className = "task completed";
        } else {
          taskInput.disabled = false;
          this.incompleteTask(this.tasklistChildren[i]);
        }
      },
      editTask: function(i) {
        var taskInput = this.tasklistChildren[i].getElementsByTagName("input")[1];
        taskInput.disabled = false;
        taskInput.focus();
      },
      incompleteTask: function(taskItem) {
        taskItem.className = "task";
      },
      enterKey: function(event) {
        if (event.keyCode === 13 || event.which === 13) {
          this.addTask();
        }
      },
      addTask: function() {
        var value = this.taskInput.value;
        this.errorMessage.style.display = "none";
  
        if (value === "") {
          this.error();
        } else {
          this.render();
          this.taskInput.value = "";
          this.evalTasklist();
        }
      },
      delTask: function(i) {
        this.tasklistChildren[i].remove();
        this.evalTasklist();
      },
      error: function() {
        this.errorMessage.style.display = "block";
      }
    };
  
    tasker.init();
  })();
  