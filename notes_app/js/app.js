console.log('welcome');
showNotes();
let saveNote=document.getElementById('saveNote');
saveNote.addEventListener('click',function(e)
{
    let addText = document.getElementById('noteText');
    let notes =localStorage.getItem("notes");
    if (notes == null)
    {
        notesObj = [];
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addText.value=addText.innerHTML;
    console.log(notesObj);
    showNotes();
})

//searchring notes
let search = document.getElementById('search-txt');
search.addEventListener('input',function()
{
    let inputValue = search.value.toLowerCase();
    let cards=document.getElementsByClassName('card');
    Array.from(cards).forEach(function (e)
    {
        let cardText = e.getElementsByTagName("p")[0].innerHTML;
        //console.log(cardText);
        if (cardText.includes(inputValue))
        {
            e.style.display = "block";
        }
        else
        {
            e.style.display = "none";
        }
    });

});

function showNotes()
{
    let noteObject = JSON.parse(localStorage.getItem('notes'));
    // console.log(noteObject);
    if(noteObject == null)
    {console.log('empty notes');}
    else
    {
        let html ="";
        Array.from(noteObject).forEach(function(e,i)
        {
            html += `<div class="card mx-1 my-1" style="width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Note ${i+1}</h5>
                      <p class="card-text" id="note-text">${e}</p>
                      <button id="${i}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
                    </div>
                </div>`
        })
        let notesElement =  document.getElementById('your-notes');
        notesElement.innerHTML = html;
    }
}
function deleteNote(i)
{
    let notes = localStorage.getItem("notes");
    //create array from localStorage
    notesObj = JSON.parse(notes);
    //delete index in the array
    notesObj.splice(i,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}