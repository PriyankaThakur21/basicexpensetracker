async function savedata(event){
    event.preventDefault()
    const expense=event.target.expense.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    const obj={expense,description,category};
    try{
    const post=await axios.post('http://localhost:3000/post/expense',obj)

    showonscreen(post.data);
    }
    catch(err){
    console.log(err)
    }
    event.target.reset();
}
function showonscreen(obj){
    const p=document.getElementById('form');
    const list=document.createElement('li');
    list.id=obj.id
    list.textContent=list.textContent+obj.expense+'--'+obj.description+'--'+obj.category;
    const deletebtn=document.createElement('input')
    deletebtn.type='button'
    deletebtn.value='delete'
    const editbtn=document.createElement('input')
    editbtn.type='button'
    editbtn.value='edit'
    editbtn.onclick=function() {editdata(obj.id)};
    deletebtn.onclick=function() {deletedata(obj.id)};
    list.appendChild(deletebtn)
    list.appendChild(editbtn)
    p.appendChild(list);
}

async function deletedata(userid){
    try{
    const dlt = axios.delete(`http://localhost:3000/delete-expense/${userid}`);
    removeexpensefromscreen(userid);
    }
catch(err){
    console.log(err);
}
}

function removeexpensefromscreen(userid){
    const parentel=document.getElementById('form');
    const childel=document.getElementById(userid)
    parentel.removeChild(childel)
}

async function editdata(id){
        try{
            const edit = await axios.get(`http://localhost:3000/editExpense/${id}`)
            console.log('edit')
            edituserdetail(edit.data.expense, edit.data.description, edit.data.category, id)
        }
        catch(err){
            console.log(err);
        }
    }

    function edituserdetail(newexpense, newdes, newcat, id){
        document.getElementById('expense').value=newexpense;
        document.getElementById('description').value=newdes;
        document.getElementById('category').value=newcat
        deletedata(id);
    }
    
window.addEventListener('DOMContentLoaded', async ()=>{
    try{
    const getExpenses= await axios.get('http://localhost:3000/get-expense');
    for(let i in getExpenses.data){
        showonscreen(getExpenses.data[i]);
    }
}
    catch(error){
        console.log(error);
    }
})