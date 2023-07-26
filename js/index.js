var siteName=document.getElementById('siteName');
var siteURL=document.getElementById('siteUrl')
var nameExist=document.getElementById('nameExist')
var invalidURL=document.getElementById('invalidURL')
var bookmarkList=[]


if(localStorage.getItem("BookmarkList"))
{

  bookmarkList=JSON.parse(localStorage.getItem("BookmarkList"));
  displayBookmark(bookmarkList) 
}



function addBookmark()
{
  
  var bookmark=
  {
    Name:siteName.value,
    URL:siteURL.value
  }
  if(validateURL() && validateName())
  {
   
    bookmarkList.push(bookmark);
    displayBookmark(bookmarkList);
    localStorage.setItem("BookmarkList",JSON.stringify(bookmarkList));
    clearForm();
    
    
  }

}


function displayBookmark(list)
{
  var counter=``
    for(var i=0;i<list.length;i++)
    {

      counter+=`<tr>
      <td>${i+1}</td>
      <td>${list[i].Name}</td>
      <td>  <a href="${list[i].URL}" target="_blank" class="btn btn-warning">Visit</a></td>
      <td> <button class="btn btn-danger" onclick="deleteBookmark(${i})"> Delete</button></td>
  </tr>`

    }
    document.getElementById('table-content').innerHTML=counter
}



function deleteBookmark(index)
{

      bookmarkList.splice(index,1);
      localStorage.setItem("BookmarkList",JSON.stringify(bookmarkList));
      displayBookmark(bookmarkList)
}

function clearForm()
{
  siteName.value="";
  siteURL.value=""
}



function validateName()
{
  
  var storeName=[];
  for(var i=0;i<bookmarkList.length;i++)
  {
   
    storeName.push(bookmarkList[i].Name)
    
  }
console.log(storeName);

  
 
  
  if(storeName.includes(siteName.value))
  {
   
   
     nameExist.classList.replace('d-none','d-block')
     siteName.classList.add('is-invalid')
    return false;
    
  }
  else
  {
    

    nameExist.classList.replace('d-block','d-none')
    siteName.classList.replace('is-invalid','is-valid')
    return true;
  }

}

function validateURL()
{
  var regex= /^(http|https):\/\/[^ "]+$/;
   if(regex.test(siteURL.value))
   {
   
    invalidURL.classList.replace('d-block','d-none');
    siteURL.classList.replace('is-invalid','is-valid')
    return true

   }
   else
   {
     invalidURL.classList.replace('d-none','d-block');
     siteURL.classList.add('is-invalid')
    return false
   }
}