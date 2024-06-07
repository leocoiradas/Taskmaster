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
        public async Task <IActionResult> GetAssignments()
        {
            try
            {
                List<Assignment> TasksCollections = await _dbcontext.Assignments.OrderByDescending(e => e.CreatedAt).ToListAsync();
                return StatusCode(StatusCodes.Status200OK, TasksCollections);
            }
            catch (Exception error)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, error);
            }
        }
        [HttpPost]
        [Route("create")]
        public async Task <IActionResult> CreateAssignment([FromBody]Assignment NewAssignmentData)
        {
            try
            {

                Assignment existantAssignment = _dbcontext.Assignments.FirstOrDefault(element => element.Title == NewAssignmentData.Title);

                if (existantAssignment == null)
                {

                    NewAssignmentData.AssignmentId = Guid.NewGuid();
                    //NewAssignmentData.DueAt = DateOnly.Parse(NewAssignmentData.DueAt, "yyyy-MM-dd");
                    _dbcontext.Assignments.Add(NewAssignmentData);
                    await _dbcontext.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, NewAssignmentData);
                }
                else 
                {
                    return StatusCode(StatusCodes.Status409Conflict, "An element with the same caracteristics is already in the database");
                }
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
        public async Task <IActionResult> UpdateAssignment([FromBody] Assignment assignmentData)
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
