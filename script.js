console.log("hellow ");
let inputFields ;
let submitBtn =  document.querySelector('form').querySelector('button');
const consumerBtn =  document.querySelector('#consumer-btn');
const supplierBtn =  document.querySelector('#supplier-btn');

const DEFAULT_REQUIRED_FIELD_STATUS = new InputValidityStatus(false,'This field is required')
const DEFAULT_VALID_STATUS = new InputValidityStatus(true,'valid')
const inputs = {
    first_name:new Input('',DEFAULT_REQUIRED_FIELD_STATUS,checkRequiredFieldValidity),
    last_name:new Input('',DEFAULT_REQUIRED_FIELD_STATUS,checkRequiredFieldValidity),
    location:new Input('',DEFAULT_REQUIRED_FIELD_STATUS,checkRequiredFieldValidity),
    business_id:new Input('',DEFAULT_REQUIRED_FIELD_STATUS,checkRequiredFieldValidity),
    email: new Input('',DEFAULT_REQUIRED_FIELD_STATUS,checkEmailValidity),
    password: new Input('',DEFAULT_REQUIRED_FIELD_STATUS,checkPasswordValidity),
    phone_number: new Input('',DEFAULT_REQUIRED_FIELD_STATUS,checkPhoneNoValidity),
    password_confirm: new Input('',DEFAULT_REQUIRED_FIELD_STATUS,checkConfirmPasswordValidity),
}

const welcomePanel = document.getElementById('welcome-panel');
const consumerPanel = document.getElementById('consumer-panel');
const supplierPanel = document.getElementById('supplier-panel');
const mainCtr = document.querySelector('.logic-container');
mainCtr.removeChild(consumerPanel);
mainCtr.removeChild(supplierPanel);



consumerBtn.addEventListener('click',openConsumerSignUPForm);
supplierBtn.addEventListener('click',openSupplierSignUPForm);

function openConsumerSignUPForm()
{
    mainCtr.removeChild(welcomePanel);
    mainCtr.removeChild(supplierPanel);
    mainCtr.appendChild(consumerPanel);
    inputFields =  document.querySelectorAll('input');
    inputFields.forEach(addInputChangeListeners);
    inputFields.forEach((inpElement) => inputs[inpElement.name].inputElement = inpElement);
    submitBtn =  document.querySelector('form').querySelector('button');
    submitBtn.addEventListener('click',submitForm);
}


function openSupplierSignUPForm()
{
    mainCtr.removeChild(welcomePanel);
    mainCtr.removeChild(consumerPanel);
    mainCtr.appendChild(supplierPanel);
    inputFields =  document.querySelectorAll('input');
    inputFields.forEach(addInputChangeListeners);
    inputFields.forEach((inpElement) => inputs[inpElement.name].inputElement = inpElement);
    submitBtn =  document.querySelector('form').querySelector('button');
    submitBtn.addEventListener('click',submitForm);
}

function submitForm()
{
    let areAllInputsValid = false;
    let invalidInpKey;
    for(let key in inputs)
    {
        if(!inputs[key].inpValidityStatus.isValid)
        {
            areAllInputsValid = false;
            invalidInpKey = key;
            console.log(`Invalid Input. ${key}`);
            break;
        }
        areAllInputsValid = true;
    }
    if(!areAllInputsValid)
    {
        console.log(`${invalidInpKey} not valid`);
        let element = inputs[invalidInpKey].inputElement;
        element.focus();
        addInvalidFocus(element);
    }
    else 
    {
        document.querySelector('form').reset();
        document.querySelector('form').querySelectorAll('span').forEach(e=>e.innerText = '');
    }
}


function checkRequiredFieldValidity(field)
{
    if(field.length === 0) return DEFAULT_REQUIRED_FIELD_STATUS;
    else return DEFAULT_VALID_STATUS;
}

function checkEmailValidity(email)
{
    if(email.length === 0) return DEFAULT_REQUIRED_FIELD_STATUS;
    if(!email.includes("@")) return new InputValidityStatus(false,"Please enter a valid email");
    if(!email.split('@')[1]) return new InputValidityStatus(false,"email should be of format: abc@xy.z");
    if(!email.split('@')[1].includes('.')) return new InputValidityStatus(false,"email should be of format: abc@xy.z");
    if(!email.split('@')[1].split('.')[1]) return new InputValidityStatus(false,"email should be of format: abc@xy.z");
    if(email.length < 8) return new InputValidityStatus(false,"email should be atleast 8 characters long");
    return new InputValidityStatus(true,"valid");
}

function checkPasswordValidity(password)
{
    if(password.length === 0) return DEFAULT_REQUIRED_FIELD_STATUS;
    if(password.length < 6) return new InputValidityStatus(false, "Password too short");
    if(!password.match(/[A-Za-z]/))return new InputValidityStatus(false, "Password should contain atleast one uppercase and one lowercase character");
    if(!password.match(/\d/))return new InputValidityStatus(false, "Password should contain atleast one number");
    return new InputValidityStatus(true, "valid");
}


function checkPhoneNoValidity(phoneNo)
{
    if(phoneNo.length === 0) return DEFAULT_REQUIRED_FIELD_STATUS;
    if(phoneNo.length !== 10) return new InputValidityStatus(false, "Invalid phone number");
    return new InputValidityStatus(true, "valid");
}

function checkConfirmPasswordValidity(confPass)
{
    if(confPass.length === 0) return DEFAULT_REQUIRED_FIELD_STATUS;
    if(confPass !== inputs['password'].value) return new InputValidityStatus(false, "Passwords Dont Match");
    return new InputValidityStatus(true, "valid");
}

function InputValidityStatus(isValid, messege)
{
    this.isValid = isValid;
    this.messege = messege;
}

function Input(value,inpValidityStatus,validityChecker,inputElement)
{
    console.log("new cI created");
    this.inpValidityStatus = inpValidityStatus;
    this.value = value;
    this.validityChecker = validityChecker;
    this.inputElement = inputElement;
}


function addInputChangeListeners(inputField)
{
    inputField.addEventListener('input', 
    (e)=>
    {
        validateInput(e.target.name,e.target.value);
        addValidFocus(e.target);
        updateInputFieldUI(e.target);
    });
    inputField.addEventListener('focusin', onFocusEntered);
    inputField.addEventListener('focusout', onFocusExit);
}

function validateInput(inpName,inpValue)
{
    inputs[inpName].value = inpValue;
    inputs[inpName].inpValidityStatus = 
    getInputValidityStatus(inpName,inpValue);
}

function getInputValidityStatus(inpName,inpValue)
{
    let inputValidityStatus = inputs[inpName].validityChecker === undefined ? 
    DEFAULT_VALID_STATUS:
    inputs[inpName].validityChecker(inpValue);
    return inputValidityStatus;
}

function onFocusEntered(e)
{
    console.log("focus in")
    addValidFocus(e.target);
    e.target.classList.remove('filled');
    e.target.classList.remove('empty');
}

function onFocusExit(e)
{
    console.log("focus out")
    e.target.classList.remove('focus');
    e.target.classList.remove('focus-valid');
    e.target.classList.remove('focus-invalid');
    if(e.target.value === ''){
        
        e.target.classList.add('empty');
        console.log("empty class added")
    }
    else {
        e.target.classList.add('filled');
        console.log("filled class added")
    }
}

function updateInputFieldUI(element)
{
    const inputvalidityStatus = 
    getInputValidityStatus(element.name,element.value);
    element.nextElementSibling.innerText = inputvalidityStatus.messege;
    element.classList.remove('empty');
    if(inputvalidityStatus.isValid )
    {
        element.nextElementSibling.classList.add('valid-inp');
        element.nextElementSibling.classList.remove('invalid-inp');
        
    }
    else{
        element.nextElementSibling.classList.add('invalid-inp');
        element.nextElementSibling.classList.remove('valid-inp');
    }
}

function addInvalidFocus(element)
{
    element.classList.remove('focus-valid');
    element.classList.add('focus-invalid');
}

function addValidFocus(element)
{
    element.classList.remove('focus-invalid');
    element.classList.add('focus-valid');
}