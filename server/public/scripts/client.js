const allEmployeeInformation = [];
let totalMonthlyCosts = 0; 

$(document).ready(init); 

function init() {
    $('.js-btn-submit').on('click', checkInputs);
} // end of init function 


function checkInputs() {
    if ( $('.js-input-firstName').val() == "" || 
    $('.js-input-lastName').val() == "" ||
    $('.js-input-idNumber').val() == "" ||
    $('.js-input-jobTitle').val() == "" ||
    $('.js-input-annualSalary').val() == "" 
    ) { 
        alert('Please Enter All Fields'); 
        return false; 
    }
    
    addEmployeeInfo(); 

}
    
function addEmployeeInfo() {
    const individualEmployeeInfo = {
        firstName: $('.js-input-firstName').val(), 
        lastName: $('.js-input-lastName').val(),
        idNumber: parseInt( $('.js-input-idNumber').val() ), 
        title: $('.js-input-jobTitle').val(),
        annualSalary: parseInt( $('.js-input-annualSalary').val() )
    }

    $('.js-input-firstName').val(''); 
    $('.js-input-lastName').val(''); 
    $('.js-input-idNumber').val(''); 
    $('.js-input-jobTitle').val(''); 
    $('.js-input-annualSalary').val('');

    allEmployeeInformation.push(individualEmployeeInfo);
    console.log(allEmployeeInformation);
    
    render(); 
    calculateMonthlyCosts(); 
    $('.js-btn-delete').on('click', deleteEmployeeInfo);   
} // end of addEmployeeInfo function 

function calculateMonthlyCosts() { 
    const tableFooter = $('tfoot'); 

    tableFooter.empty(); 

    for (let i = 0; i < allEmployeeInformation.length; i++) {
        const employee = allEmployeeInformation[i]; 
        const convertToMonthlyCosts = employee.annualSalary/12;
        
        totalMonthlyCosts += convertToMonthlyCosts; 
    }

    if (totalMonthlyCosts > 20000) {
        $('tfoot').addClass('turnred'); 

        tableFooter.append(`
            <tr>
                <td>
                    Total Monthly: $${totalMonthlyCosts}
                </td>
            </tr>
        `);
    } else { 
        tableFooter.append(`
            <tr>
                <td>
                    Total Monthly: $${totalMonthlyCosts}
                </td>
            </tr>
        `);
    }
} // end of calculateMonthlyCosts function 

function deleteEmployeeInfo() {  
    const tableFooter = $('tfoot'); 
    let trElement = $(this).parent().parent(); 
    trElement.remove();

    if (totalMonthlyCosts > 20000) {
        $('tfoot').addClass('turnred'); 
    }
} // end of deleteEmployeeInfo function 

function render() { 
    console.log('render');
    
    const tableElement = $('.js-table-data');
    tableElement.empty(); 

    for (let i = 0; i < allEmployeeInformation.length; i++) {
        const employee = allEmployeeInformation[i]; 
        
        tableElement.append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td> 
                <td>${employee.idNumber}</td>
                <td>${employee.title}</td>
                <td>$${employee.annualSalary}</td> 
                <td>
                    <button class="js-btn-delete">Delete</button> 
                </td> 
            </tr>
        `); 
    }
}