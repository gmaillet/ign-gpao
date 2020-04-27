 {
    let myName = document.currentScript.getAttribute('name');
    const ipc       = require('electron').ipcRenderer;

    let  asyncBtn  = document.querySelector('#file-selector-'+myName);
    let replyField = document.querySelector('#file-selector-content-'+myName);
    let onButtonClick = function() {
        const { dialog } = require('electron').remote;

         dialog.showOpenDialog(function(fileNames) {
             if (fileNames==undefined){
               console.log('no file selected');
               replyField.value = '';
             } else {
               console.log('file:', fileNames[0]);
               replyField.value = fileNames[0];
             }
        })
    };

    asyncBtn.addEventListener("click", onButtonClick);
}
