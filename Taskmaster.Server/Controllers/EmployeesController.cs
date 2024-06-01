using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskmaster.Server.Models;

namespace Taskmaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly TaskmasterContext _dbcontext;

        public EmployeesController(TaskmasterContext dbcontext) {
            
            _dbcontext = dbcontext;

        }

        [HttpGet]
        [Route("get")]
        public async Task <IActionResult> GetEmployees()
        {
            List<Employee> Employees = await _dbcontext.Employees.OrderByDescending(e => e.EmployeeId).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, Employees);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateEmployee([FromBody] Employee employeeData)
        {
            Employee searchEmployee = _dbcontext.Employees.Find(employeeData.Email);
            if (searchEmployee == null)
            {
                employeeData.Password = BCrypt.Net.BCrypt.HashPassword(employeeData.Password);
                await _dbcontext.Employees.AddAsync(employeeData);
                await _dbcontext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK);
            }
            else
            {
                //ViewData["Error"] = "There's already an employee with the email provided in the database";
                return StatusCode(StatusCodes.Status400BadRequest);
            }
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateEmployeeData([FromBody] Employee employeeData)
        {
            _dbcontext.Employees.Update(employeeData);
            await _dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            Employee employee = _dbcontext.Employees.Find(id);
            if (employee != null)
            {
                _dbcontext.Employees.Remove(employee);
                await _dbcontext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            
        }
    }

}
