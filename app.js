function tb(text) {
    let binary = '';
    for(let i=0; i<text.length;i++){
        binary+=text[i].charCodeAt(0).toString(2)+'';
    }
    return binary;
}
function cb() {
    let text=document.getElementsById("text").value;
    let binary= tb(text);
    document.getElementById("binary").innerHTML= binary;
}
