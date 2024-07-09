using System;
using System.Collections.Generic;

namespace Taskmaster.Server.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly BirthDate { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Country { get; set; } = null!;

    public string Role { get; set; } = null!;
}
