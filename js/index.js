var siteName=document.getElementById('siteName');
var siteURL=document.getElementById('siteUrl')
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
 

  var storeName=[];
for(var i=0;i<bookmarkList.length;i++)
{
 
  storeName.push(bookmarkList[i].Name)
  
}
console.log(storeName);

if(storeName.includes(siteName.value))
{
  document.getElementById('nameExist').innerHTML="This name already exist"
}
else
{
  if(validateURL())
  {
    bookmarkList.push(bookmark);
    displayBookmark(bookmarkList);
    localStorage.setItem("BookmarkList",JSON.stringify(bookmarkList));
    clearForm();
    
  }
  else
  {
    document.getElementById('invalidURL').innerHTML="Invalid URL"
  }
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


function validateURL()
{
  var regex= /^(http|https):\/\/[^ "]+$/;
   if(regex.test(siteURL.value))
   {
    console.log("yes");
    return true
   }
   else
   {
    console.log("no");
    return false
   }
}