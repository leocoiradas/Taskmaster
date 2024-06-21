using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Taskmaster.Server.Models;

public partial class Assignment
{
    public Guid AssignmentId { get; set; }

    [ForeignKey("EmployeeId")]
    public int? EmployeeAssigned { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateOnly CreatedAt { get; set; }

    public DateOnly DueAt { get; set; }

    
    public virtual Employee? EmployeeAssignedNavigation { get; set; }

}
