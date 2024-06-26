﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Taskmaster.Server.Models;

public partial class Employee
{
    [Key]
    public int EmployeeId { get; set; }

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
}
