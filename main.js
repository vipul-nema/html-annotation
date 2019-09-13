let annotatedNode = {
    tag_1_1: {
        top: 100,
        left: 30,
        tag: 'tag_1',
        value: 'html',
        start: 20,
        end: 26
    }

};
$(window).on("load", function () {
    //...............
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

    node.designMode = "on";
    node.body.contentEditable = true;

    //Assign iframe content's height to its child 
    document.getElementById('iframe_annotation').style.height = document.getElementById('iframe_annotation').contentDocument.body.scrollHeight + 100 + 'px';

    function getStartPosition(event) {
        // startPos = getXYRelativeToWindow(event.currentTarget);
    }




    function getEndPosition(event) {
        var range;

        var targetOffset = getXYRelativeToWindow(event.target);
        // if (document.selection && document.selection.createRange) {
        //     range = document.selection.createRange();
        //     console.log('range.htmlText', range.htmlText);
        //     return range.htmlText;
        // }
        // else 
        if (node.getSelection) {
            var selection = node.getSelection();
            if (selection.rangeCount > 0) {
                range = selection.getRangeAt(0);

                var clonedSelection = range.cloneContents();
                debugger;

                let clientRects = range.getClientRects();

                let firstRect = clientRects[0];
                let lastRect = clientRects[0];



                var div = document.createElement('div');
                div.appendChild(clonedSelection);
                // node.execCommand('insertHTML', true, `<mark class="ddddd">${div.innerHTML}</mark>`);
                // console.log('innerHTML', div.innerHTML);

                var childHtml = getChildHtml(`${div.innerHTML}`);
                var parentHtml = `${node.body.parentNode.outerHTML}`;
                var start = parentHtml.indexOf(childHtml);
                var end = start + childHtml.length;

                // console.log('gggggggggggg', start, end, parentHtml)
                updateAnnotateConfig({
                    top: firstRect.top - 20,
                    left: firstRect.left,
                    value: childHtml,
                    tag: 'tag_2',
                    start,
                    end
                })

                updateAnnotationNode()

                return div.innerHTML;
            }
        }

    }

    function getChildHtml(childHtml) {
        var closeAngelIndex = childHtml.indexOf('>');
        var openAngelLastIndex;
        var newChildHtml;
        if (closeAngelIndex > -1) {
            newChildHtml = childHtml.slice(closeAngelIndex + 1);
            openAngelLastIndex = newChildHtml.lastIndexOf('<');
            if (openAngelLastIndex > -1) {
                newChildHtml = newChildHtml.slice(0, openAngelLastIndex);
            }
        } else {
            newChildHtml = childHtml;
        }
        return newChildHtml
    }

    // Create annotatedNodeElm

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


