using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Taskmaster.Server.Models;

public partial class Assignment
{
    [Key]
    public Guid Id { get; set; }
    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public string Description { get; set; } = null!;
    [Required]
    [AllowedValues("Pending", "In progress", "Completed")]
    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
    [Required]
    public DateTime DueAt { get; set; }

    public virtual Employee Employee{ get; set; } = null!;
}
