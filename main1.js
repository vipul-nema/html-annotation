var selection = Selection.create({

    // Class for the selection-area
    class: 'selection',
    selectables: ['body'],
    boundaries: ['body']


})
selection.on('beforestart', evt => {
    // This function can return "false" to abort the selection
    console.log('beforestart', evt);
}).on('start', evt => {
    console.log('start', evt);
}).on('move', evt => {
    console.log('move', evt);
}).on('stop', evt => {
    console.log('stop', evt);
    debugger;
});