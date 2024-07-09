using System;
using System.Collections.Generic;

namespace Taskmaster.Server.Models;

public partial class Assignment
{
    public Guid Id { get; set; }

    public int EmployeeId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime DueAt { get; set; }

    public virtual Employee Employee { get; set; } = null!;
}
