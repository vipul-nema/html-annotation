
let selection;

document.onselectionchange = function () {
    console.log('New selection made');
    selection = document.getSelection();
};