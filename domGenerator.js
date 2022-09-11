const parent = document.querySelector('.main-container');
const panel = getNewPanel();
panel.appendChild(getPanelHeader('Sign Up','panel-header'));
parent.appendChild(panel);

function ElementInfo(type,content,elemClass,elemID)
{
    this.type = type;
    this.content = content;
    this.elemClass = elemClass;
    this.elemID = elemID;
}

function getNewPanel()
{
    const panel = generateElement('div');
    panel.classList.add('panel');
    panel.setAttribute('id','consumr-panel');
    return panel;
}

function getPanelHeader(headerText,headerClass)
{
    const header = generateElement('div');
    header.classList.add(headerClass);
    header.textContent = headerText;
    return header;
}

function generateElement(type,textContent,)
{
    return document.createElement(type);
}