using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Taskmaster.Server.Models;


namespace Taskmaster.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        private readonly TaskmasterContext _dbcontext;

        public AssignmentsController(TaskmasterContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        [Route("assignments")]
        public async Task<IActionResult> GetAssignments()
        {
            try
            {
                var assignments = await _dbcontext.Assignments
                    .Include(e => e.EmployeeId)
                    .OrderByDescending(e => e.CreatedAt)
                    .Select(assignment => new
                    {
                        AssignmentId = assignment.Id,
                        EmployeeId = assignment.EmployeeId,
                        Title = assignment.Title,
                        Description = assignment.Description,
                        Status = assignment.Status,
                        CreatedAt = assignment.CreatedAt,
                        DueAt = assignment.DueAt,
                        Employee = assignment.EmployeeId != null ? new
                        {
                            Name = assignment.Employee.FirstName,
                            LastName = assignment.Employee.LastName
                            
                        } : null 
                    })
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, assignments);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error);
            }
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateAssignment([FromBody] Assignment NewAssignmentData)
        {
            try
            {
                NewAssignmentData.Id = Guid.NewGuid();
                //NewAssignmentData.DueAt = DateOnly.Parse(NewAssignmentData.DueAt, "yyyy-MM-dd");
                _dbcontext.Assignments.Add(NewAssignmentData);
                await _dbcontext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, NewAssignmentData);
            }
            catch (Exception error)
            {

                Console.WriteLine(error);
                return StatusCode(StatusCodes.Status500InternalServerError, error);
            }
        }

        [HttpGet]
        [Route("edit")]
        public async Task<IActionResult> GetAssignmentById(string id)
        {
            Assignment assignment = await _dbcontext.Assignments.FindAsync(id);

            if (assignment != null)
            {
                return StatusCode(StatusCodes.Status200OK, assignment);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateAssignment([FromBody] Assignment assignmentData)
        {
            try
            {


                _dbcontext.Assignments.Update(assignmentData);
                await _dbcontext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, assignmentData);



            }
            catch (Exception error)
            {

                Console.WriteLine(error);
                return StatusCode(StatusCodes.Status500InternalServerError, error);
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteAssignment(Guid id)
        {
            try
            {
                Assignment searchAssignment = await _dbcontext.Assignments.FindAsync(id);
                if (searchAssignment != null)
                {
                    _dbcontext.Assignments.Remove(searchAssignment);
                    await _dbcontext.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, "Assignment deleted succesfully");

                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception error)
            {
                Console.WriteLine(error);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}