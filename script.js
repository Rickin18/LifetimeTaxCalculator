document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Constants
    const personal_allowance = 12570;
    const basic_rate_threshold = 50270;
    const higher_rate_threshold = 125140;
    const basic_rate = 0.20;
    const higher_rate = 0.40;
    const additional_rate = 0.45;

    const ni_threshold1 = 12570;
    const ni_threshold2 = 50270;
    const ni_rate1 = 0.08;
    const ni_rate2 = 0.02;

    const inheritance_tax_threshold = 500000;
    const inheritance_tax_rate = 0.40;

    // User Inputs
    const salary = parseFloat(document.getElementById('salary').value);
    const years_to_retirement = parseInt(document.getElementById('yearsToRetirement').value);
    const home_value = parseFloat(document.getElementById('homeValue').value);

    // Income Tax Calculation
    let income_tax;
    if (salary <= personal_allowance) {
        income_tax = 0;
    } else if (salary <= basic_rate_threshold) {
        income_tax = (salary - personal_allowance) * basic_rate;
    } else if (salary <= higher_rate_threshold) {
        income_tax = (basic_rate_threshold - personal_allowance) * basic_rate + (salary - basic_rate_threshold) * higher_rate;
    } else {
        income_tax = (basic_rate_threshold - personal_allowance) * basic_rate + (higher_rate_threshold - basic_rate_threshold) * higher_rate + (salary - higher_rate_threshold) * additional_rate;
    }

    // National Insurance Calculation
    let national_insurance;
    if (salary <= ni_threshold1) {
        national_insurance = 0;
    } else if (salary <= ni_threshold2) {
        national_insurance = (salary - ni_threshold1) * ni_rate1;
    } else {
        national_insurance = (ni_threshold2 - ni_threshold1) * ni_rate1 + (salary - ni_threshold2) * ni_rate2;
    }

    // Total Deductions
    const total_deductions = income_tax + national_insurance;

    // Total Lifetime income tax Deductions
    const total_lifetime_income_tax_deductions = (income_tax + national_insurance) * years_to_retirement;

    // After-Tax Income
    const net_income = salary - total_deductions;

    // Post-Tax Income Multiplied by Years to Retirement
    const total_net_income_over_years = net_income * years_to_retirement;

    // Total Potential Value including Home
    const total_potential_value = total_net_income_over_years + home_value;

    // Inheritance Tax Calculation
    let inheritance_tax;
    if (total_potential_value <= inheritance_tax_threshold) {
        inheritance_tax = 0;
    } else {
        inheritance_tax = (total_potential_value - inheritance_tax_threshold) * inheritance_tax_rate;
    }

    // Total tax paid from income and inheritance
    const lifetime_tax_paid = inheritance_tax + total_lifetime_income_tax_deductions;

    // Display Results
    document.getElementById('results').innerHTML = `
        <p>Gross Salary: £${salary.toLocaleString()}</p>
        <p>Income Tax: £${income_tax.toLocaleString()}</p>
        <p>National Insurance: £${national_insurance.toLocaleString()}</p>
        <p>Total Deductions: £${total_deductions.toLocaleString()}</p>
        <p>Net Income: £${net_income.toLocaleString()}</p>
        <p>Total Income Over ${years_to_retirement} Years: £${total_net_income_over_years.toLocaleString()}</p>
        <p>Total Income Tax Over ${years_to_retirement} Years: £${total_lifetime_income_tax_deductions.toLocaleString()}</p>
        <p>Total Potential Net Worth (Including Home): £${total_potential_value.toLocaleString()}</p>
        <p>Potential Inheritance Tax: £${inheritance_tax.toLocaleString()}</p>
        <p>Total Lifetime Tax Potentially Due: £${lifetime_tax_paid.toLocaleString()}</p>
    `;
    // Assuming you're dynamically creating the HTML content
const container = document.querySelector('.container');

// Check if the disclaimer paragraph already exists
if (!container.querySelector('.p2')) {
    const disclaimerParagraph = document.createElement('p');
    disclaimerParagraph.textContent = 'The above figures do not constitute financial advice and are only for illustrative purposes. Please contact your financial advisor for more details.';
    disclaimerParagraph.classList.add('p2'); // Add the custom class
    container.appendChild(disclaimerParagraph);
}

});
