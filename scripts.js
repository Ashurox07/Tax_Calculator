$(document).ready(function () {
  $('#taxForm').submit(function (e) {
    e.preventDefault();
    $(".error-icon").hide();
    var grossIncome = parseFloat($('#grossIncome').val());
    var extraIncome = parseFloat($('#extraIncome').val());
    var age = $('#age').val();
    var deductions = parseFloat($('#deductions').val());

    if (isNaN(grossIncome)) {
      $('#grossIncomeError').show();
      return;
    }
    if (isNaN(extraIncome)) {
      $('#extraIncomeError').show();
      return;
    }
    if (age === "") {
      $('#ageError').show();
      return;
    }
    if (isNaN(deductions)) {
      $('#deductionsError').show();
      return;
    }

    var overallIncome = grossIncome + extraIncome - deductions;
    var tax = 0;

    if (overallIncome > 800000) {
      switch (age) {
        case "<40":
          tax = 0.3 * (overallIncome - 800000);
          break;
        case "40-60":
          tax = 0.4 * (overallIncome - 800000);
          break;
        case "60+":
          tax = 0.1 * (overallIncome - 800000);
          break;
      }
    }

    var netIncome = overallIncome - tax;

    $('#resultText').text("Your overall income will be " + formatCurrency(netIncome) + " after tax deduction");
    $('#resultModal').modal('show');
  });
});

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(amount);
}
