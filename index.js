document.getElementById('submit').addEventListener('click', function(){
    let myobj=JSON.parse(localStorage.getItem('total') || "[]");
    let exp=document.getElementById('expense');
    expense=exp.value;
    let des=document.getElementById('description');
    description=des.value;
    let cat=document.getElementById('category');
    category=cat.value;
    let obj={
        expense, description, category
    }
    myobj.push(obj);
    localStorage.setItem('total', JSON.stringify(myobj));
    showonscreen(obj);
})
function showonscreen(obj){
    const parentEl=document.getElementById('form');
    const childEl=document.createElement('li');
    childEl.textContent=obj.expense+' '+obj.description+' '+obj.category;
    const btn=document.createElement('input');
    btn.type='button';
    btn.value='delete';
    btn.onclick=()=>{
        localStorage.removeItem('total');
        parentEl.removeChild(childEl);
    }
    parentEl.append(childEl);
    childEl.append(btn);
}