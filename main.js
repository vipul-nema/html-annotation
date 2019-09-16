let annotatedNode = {
    tag_1_100_30: {
        top: 100,
        left: 30,
        tag: 'name',
        value: '<span>Ravi</span>',
        start: 20,
        end: 26
    },
    tag_1_100_30: {
        top: 100,
        left: 30,
        tag: 'email',
        value: 'vipul@naukri.com',
        start: 20,
        end: 26
    }
};


$(window).on("load", function () {


    //...............

    function getUniqueID() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    let num = 1;
    // var startPos = { x: 0, y: 0 }
    // var endPos = { x: 0, y: 0 }

    //Event binding on iframe
    window.getSelection().addRange(new Range());
    let iframe_annotation = document.querySelector('#iframe_annotation');
    // iframe_annotation.addEventListener('onmousedown', getStartPosition);
    var node = iframe_annotation.document ||
        iframe_annotation.contentDocument ||
        iframe_annotation.contentWindow.document;
    node.addEventListener('mouseup', getEndPosition);

    var elements = node.querySelectorAll('body *');
    let elementsLength = elements.length;
    for (let i = 0; i < elementsLength; i++) {
        elements[i].setAttribute('data-ann-id', getUniqueID() + '-' + i)
    }

    // node.designMode = "on";
    // node.body.contentEditable = true;

    //Assign iframe content's height to its child 
    document.getElementById('iframe_annotation').style.height = document.getElementById('iframe_annotation').contentDocument.body.scrollHeight + 100 + 'px';

    function getStartPosition(event) {
        // startPos = getXYRelativeToWindow(event.currentTarget);
    }




    function getEndPosition(event) {
        var range;

        // if (document.selection && document.selection.createRange) {
        //     range = document.selection.createRange();
        //     console.log('range.htmlText', range.htmlText);
        //     return range.htmlText;
        // }
        // else 
        if (node.getSelection) {
            let selection = node.getSelection();
            if (selection.rangeCount > 0) {
                range = selection.getRangeAt(0);

                let clonedSelection = range.cloneContents();
                //get clientRect position of selected node or characters
                let clientRects = range.getClientRects();
                let firstRect = clientRects[0];
                let lastRect = clientRects[0];

                var div = document.createElement('div');
                div.appendChild(clonedSelection);
                // node.execCommand('insertHTML', true, `<mark class="ddddd">${div.innerHTML}</mark>`);
                // console.log('innerHTML', div.innerHTML);

                var childHtml = getChildHtml(`${div.innerHTML}`);
                var parentHtml = `${node.body.parentNode.outerHTML}`;
                // debugger;
                var start = getSelectedNodeIndex(parentHtml, childHtml, range, selection, event);
                var end = start + childHtml.length;

                // console.log('gggggggggggg', start, end, parentHtml)
                updateAnnotateConfig({
                    top: firstRect.top - 20,
                    left: firstRect.left,
                    value: childHtml,
                    tag: 'tag_2',
                    start,
                    end
                });

                // updateAnnotationNode()

                return div.innerHTML;
            }
        }

    }

    function getChildHtml(childHtml) {

        //Add all openig tags data
        while (childHtml.indexOf('<') === 0) {
            childHtml = childHtml.slice(childHtml.indexOf('>') + 1);
        }

        //Delete all end tags data
        while (childHtml.lastIndexOf('>') === childHtml.length - 1) {
            childHtml = childHtml.slice(0, childHtml.lastIndexOf('<'));
        }
        return childHtml;
    }

    function getSelectedNodeIndex(parentHtml, selectedItem, range, selection, event) {
        // console.log('range', range, selection);
        if (selectedItem.includes('<') && selectedItem.includes('>')) {
            return parentHtml.indexOf(selectedItem);
        } else {
            let parentElement = range.commonAncestorContainer;
            while (parentElement.nodeType !== 1) {
                parentElement = parentElement.parentElement;
            }
            let commonParentHtml = parentElement.outerHTML;
            let commonParentHtmlStart = parentHtml.indexOf(commonParentHtml);
            let selectedItemStart = commonParentHtml.indexOf(selectedItem);
            return commonParentHtmlStart + selectedItemStart;
        }
    }


    function updateAnnotateConfig(config) {

        annotatedNode[config.tag + '_' + num] = {
            top: config.top,
            left: config.left,
            tag: config.tag,
            value: config.value,
            start: config.start,
            end: config.end
        };
        num = num + 1;
        return

    }

    let annotatedNodeElm = document.createElement('div');
    annotatedNodeElm.id = 'annotatedNodeElm';
    let middleSection = document.querySelector('.middle-section')
    middleSection.appendChild(annotatedNodeElm);

    annotatedNodeElm = document.getElementById('annotatedNodeElm');

    (function (params) {

        updateAnnotationNode();

    })()

    //............


    // var Go = (event) => {
    //     dispray[0].innerHTML = "";
    //     endPos = getXYRelativeToWindow(event.target)
    //     var r = window.getSelection().getRangeAt(0);
    //     var fragm = r.cloneContents();

    //     dispray[0].appendChild(fragm);
    //     debugger;
    //     dispray[1].innerText = dispray[0].innerHTML;
    //     //dispray[0].innerText = dispray[0].innerText; 
    //     console.log('dispray[0].innerHTML', dispray[0].innerHTML);
    //     createNode();
    // }
    function updateAnnotationNode() {

        for (let prop in annotatedNode) {
            if (annotatedNode.hasOwnProperty) {
                let config = annotatedNode[prop];
                let annotatedChild = createNode(config);
                annotatedNodeElm.appendChild(annotatedChild)
            }
        }

    }

    function createNode(config) {
        let { top, left, value, tag } = config;
        let annotatedChild = document.createElement('span');
        annotatedChild.className = 'annotatedChild';

        let style = {
            position: 'absolute',
            top: top + 'px',
            left: left + 'px',
            'z-index': 9000,
            'background-color': 'grey',
            opacity: 0.8,
            height: '10px',
            width: '100px',
        };

        for (let prop in style) {
            annotatedChild.style[prop] = style[prop];
        }
        annotatedChild.innerText = tag;
        return annotatedChild;
    }
    function getXYRelativeToWindow(element) {
        var topPos = 0;
        var leftPos = 0;
        // if (element) {
        //     topPos =  element.getBoundingClientRect().top + window.scrollY;
        //     leftPos = element.getBoundingClientRect().left + window.scrollX;
        // }

        // var childPos = element.offset();
        // var parentPos = element.parent().offset();
        var childOffset = {
            offsetTop: element.offsetTop,
            offsetLeft: element.offsetLeft
        }
        return childOffset;
    }


    function getPosition(childHtml) {
        var iframeHtml = node.innerHTML;

        if (iframeHtml.included(childHtml)) {

        }

    }


    // document.getElementsByTagName('html')[0].innerHTML

})


