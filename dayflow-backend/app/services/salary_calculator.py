# app/services/salary_calculator.py

def calculate_salary(
    basic_salary: float,
    hra: float,
    bonus: float,
    tax: float,
    pf: float,
):
    """
    Central salary calculation logic.
    Single source of truth.
    """

    gross_salary = basic_salary + hra + bonus
    total_deductions = tax + pf

    net_salary = gross_salary - total_deductions

    return {
        "gross_salary": round(gross_salary, 2),
        "net_salary": round(net_salary, 2),
    }
