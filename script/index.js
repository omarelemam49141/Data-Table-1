window.addEventListener("load", function(){
    var emps = [], count=30;
    var randomNames= ["John", "Jane", "Bob", "Alice", "Michael", "Emily", "David", "Olivia", "Ethan", "Sophia", "William", "Ava", "James", "Isabella", "Daniel", "Mia", "Joseph", "Charlotte"];
    var randomAges = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    var randomOffices = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Columb"];
    var randomPositions = ["Manager", "Supervisor", "Assistant", "Developer", "Analyst", "Designer", "QA", "HR"];
    var randomStartDates = ["01/01/2023", "02/01/2024", "03/01/2024", "04/01/2019", "05/01/2018", "06/01/2018", "07/01/2023", "08/01/2022", "09/01/2021"];
    var sortBtns = document.querySelector("thead");
    var searchInput = document.getElementById("searchInput");
    var selectInput = document.getElementById("selectInput");
    var currentID = 1;

    function Employee(_id, _name, _age, _office, _position, _startDate){
        this.id = _id;
        this.name = _name;
        this.age = _age;
        this.office = _office;
        this.position = _position;
        this.startDate = _startDate;
    }

    function fillArrayRandom()
    {
        emps = [];
        for (var i = 1; i <= count; i++) {
            emps.push(new Employee(currentID++,
            randomNames[Math.floor(Math.random()*randomNames.length)],
            randomAges[Math.floor(Math.random()*randomAges.length)],
            randomOffices[Math.floor(Math.random()*randomOffices.length)],
            randomPositions[Math.floor(Math.random()*randomPositions.length)],
            randomStartDates[Math.floor(Math.random()*randomStartDates.length)]));
        } 
    }

    function displayEmployees(list)
    {
        document.querySelector("tbody").innerHTML = "";
        list.forEach(function(item){
            var tr = document.createElement("tr");
            tr.innerHTML = `<td class="id">${item.id}</td>
            <td class="name">${item.name}</td>
            <td class="position">${item.position}</td>
            <td class="office">${item.office}</td>
            <td class="age">${item.age}</td>
            <td class="startDate">${item.startDate}</td>
            <td class="delete">☒</td>`;
            document.querySelector("tbody").appendChild(tr);
        })
    }

    function Sort(e)
    {
        if(e.target.nodeName == "P")
        {
            var sortedEmps = emps.slice();
            if (e.target.className == 'up') { //sort Desc
                if (e.target.parentNode.id == "startDate") { //If Date
                    sortedEmps.sort(function(a,b){
                        return new Date(b[e.target.parentNode.id]) > new Date(a[e.target.parentNode.id])? 1: -1;
                    })
                }
                else
                {
                    sortedEmps.sort(function(a,b){
                        return b[e.target.parentNode.id] > a[e.target.parentNode.id]? 1: -1;
                    })
                }
            } else { //Sort Asc
                if (e.target.parentNode.id == "startDate") { //If Date
                    sortedEmps.sort(function(a,b){
                        return new Date(a[e.target.parentNode.id]) > new Date(b[e.target.parentNode.id])? 1: -1;
                    })
                }
                else
                {
                    sortedEmps.sort(function(a,b){
                        return a[e.target.parentNode.id] > b[e.target.parentNode.id]? 1: -1;
                    })
                }
            }
            
            displayEmployees(sortedEmps);
        }
    }

    function search()
    {
        var searchArr = emps.filter(function(item){
            return (item.id.toString().toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
            ||item.name.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
            || item.position.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
            || item.office.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
            || item.startDate.toString().toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1
            || item.age.toString().toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1);
        })

        displayEmployees(searchArr);
    }

    function showNumberOfItems()
    {
        if (selectInput.value == 'all') {
            displayEmployees(emps);
        }
        else
        {
            var newEmps = emps.slice(0, parseInt(selectInput.value));
            displayEmployees(newEmps);
        }
    }

    function deleteItem(id)
    {
        console.log(emps);
        var empsToDelete = emps.filter(function(emp){
            return emp.id == id;
        }) 
        empToDelete = empsToDelete[0];
        emps.splice(emps.indexOf(empToDelete), 1);
        displayEmployees(emps);
    }

    fillArrayRandom();
    displayEmployees(emps);
    sortBtns.addEventListener('click', Sort);
    searchInput.addEventListener("keyup", search);
    selectInput.addEventListener("change", showNumberOfItems);
    var myTable = document.querySelector("table");
    myTable.addEventListener("click", function(e){
        if (e.target.className == "delete") {
            var idToDelete = e.target.parentNode.children[0].innerText;
            deleteItem(idToDelete);
        }
    }) 
})