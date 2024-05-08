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
           List <Assignment> TasksCollections = await _dbcontext.Assignments.OrderByDescending(e => e.AssignmentID).ToListAsync();
           return StatusCode(StatusCodes.Status100Continue);
        }

        [HttpGet]
        [Route("assignments/{string: id}")]
        public async Task<IActionResult> GetAssignmentById(string id)
        {
            Assignment TaskById = _dbcontext.Assignments.Find(id);
            if (TaskById != null)
            {
                return StatusCode(StatusCodes.Status200OK, TaskById);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            //List<Assignment> TasksCollections = await _dbcontext.Assignments.OrderByDescending(e => e.AssignmentID).ToListAsync();
            
        }
        [HttpPut]
        [Route("update")]
        public async Task <IActionResult> UpdateAssignment([FromBody] Assignment assignmentData)
        {
            Assignment searchAssignment = await _dbcontext.Assignments.FindAsync(assignmentData.AssignmentID);
            if (searchAssignment != null)
            {
                _dbcontext.Assignments.Update(searchAssignment);
                await _dbcontext.SaveChangesAsync();
                return RedirectToAction("Index");

            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
        }

        [HttpDelete]
        [Route("delete/{string: id}")]
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
