using System;
using System.Collections.Generic;

namespace Taskmaster.Server.Models;

public partial class Assignment
{
    public Guid? AssignmentID { get; set; }

    public int? EmployeeAssigned { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateOnly CreatedAt { get; set; }

    public DateOnly DueAt { get; set; }

    public virtual Employee? EmployeeAssignedNavigation { get; set; }
}
