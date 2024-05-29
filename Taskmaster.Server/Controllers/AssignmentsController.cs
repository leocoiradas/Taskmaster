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
                List<Assignment> TasksCollections = await _dbcontext.Assignments.OrderByDescending(e => e.AssignmentId).ToListAsync();
                return StatusCode(StatusCodes.Status200OK, TasksCollections);
            }
            catch (Exception error)
            {

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
        [Route("delete/edit")]
        public async Task<IActionResult> DeleteAssignment(string id)
        {
            Assignment searchAssignment = await _dbcontext.Assignments.FindAsync(id);
            if (searchAssignment != null)
            {
                _dbcontext.Assignments.Remove(searchAssignment);
                await _dbcontext.SaveChangesAsync();
                return RedirectToAction("Index");

            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
        }
    }
}
